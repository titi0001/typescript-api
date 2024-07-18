import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import interfaceAbrigoRepository from "./interfaces/interfaceAbrigoRepository";
import { verificaCelular, verificaEmail } from "../utils/verifica";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import EnderecoEntity from "../entities/Endereco";

export default class AbrigoRepository implements interfaceAbrigoRepository {
  constructor(private repository: Repository<AbrigoEntity>) {}

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    if (await verificaCelular(this.repository, abrigo.celular)) {
      throw new RequisicaoRuim("Celular já cadastrado");
    }

    if (await verificaEmail(this.repository, abrigo.email)) {
      throw new RequisicaoRuim("Email já cadastrado");
    }
    await this.repository.save(abrigo);
  }

  async listAbrigos(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }

  async atulizaAbrigo(id: number, abrigo: AbrigoEntity) {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!abrigoToUpdate) {
      throw new NaoEncontrado("Abrigo não encontrado");
    }

    Object.assign(abrigoToUpdate, abrigo);
    await this.repository.save(abrigoToUpdate);
    return { success: true };
  }

  async deletaAbrigo(id: number) {
    const abrigoToRemove = await this.repository.findOne({ where: { id } });

    if (!abrigoToRemove) {
      throw new NaoEncontrado("Abrigo não encontrado");
    }

    await this.repository.remove(abrigoToRemove);
    return { success: true };
  }

  async atulizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
    const abrigo = await this.repository.findOne({
      where: { id: idAbrigo },
    });

    if (!abrigo) {
      throw new NaoEncontrado("Abrigo não encontrado");
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);

    return { success: true };
  }
}
