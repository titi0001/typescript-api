import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/Endereco";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) {}

  criaAdotante(adotante: AdotanteEntity): void | Promise<void> {
    this.repository.save(adotante);
  }

  async listAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async atulizaAdotante(
    id: number,
    adotante: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!adotanteToUpdate) {
        return { success: false, message: "Adotante não encontrado" };
      }

      Object.assign(adotanteToUpdate, adotante);
      await this.repository.save(adotanteToUpdate);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Erro ao atualizar adotante" };
    }
  }
  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });

      if (!adotanteToRemove) {
        return { success: false, message: "Adotante não encontrado" };
      }

      await this.repository.remove(adotanteToRemove);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Erro ao deletar adotante",
      };
    }
  }

  async atulizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotante = await this.repository.findOne({
        where: { id: idAdotante },
      });

      if (!adotante) {
        return { success: false, message: "Adotante não encontrado" };
      }

      const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
      adotante.endereco = novoEndereco;
      await this.repository.save(adotante);

      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Erro ao atualizar endereco do adotante",
      };
    }
  }
}
