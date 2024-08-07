import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import { verificaCelular } from "../utils/verifica";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) {}


  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    if (await verificaCelular(this.repository, adotante.celular)) {
      throw new RequisicaoRuim("Celular já cadastrado");
    }
    await this.repository.save(adotante);
  }

  async listAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async atulizaAdotante(id: number, adotante: AdotanteEntity) {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

    if (!adotanteToUpdate) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    Object.assign(adotanteToUpdate, adotante);
    await this.repository.save(adotanteToUpdate);
    return { success: true };
  }
  async deletaAdotante(id: number) {
    const adotanteToRemove = await this.repository.findOne({ where: { id } });

    if (!adotanteToRemove) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    await this.repository.remove(adotanteToRemove);
    return { success: true };
  }

  async atulizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity) {
    const adotante = await this.repository.findOne({
      where: { id: idAdotante },
    });

    if (!adotante) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);

    return { success: true };
  }
}
