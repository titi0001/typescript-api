import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(repository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>
  ) {
    this.repository = repository;
    this.adotanteRepository = adotanteRepository;
  }

  async criaPet(pet: PetEntity): Promise<void> {
    await this.repository.save(pet);
  }

  async listaPets(): Promise<PetEntity[]> {
    return await this.repository.find();
  }

  async atualizaPet(
    id: number,
    newData: PetEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.repository.findOne({ where: { id } });

      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado" };
      }

      Object.assign(petToUpdate, newData);
      await this.repository.save(petToUpdate);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Erro ao atualizar pet" };
    }
  }

  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const petToRemove = await this.repository.findOne({ where: { id } });

      if (!petToRemove) {
        return { success: false, message: "Pet não encontrado" };
      }

      await this.repository.remove(petToRemove);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Erro ao deletar pet",
      };
    }
  }

  async adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> {

      const pet = await this.repository.findOne({ where: { id: idPet } });
      if (!pet) {
        return { success: false, message: "Pet não encontrado" };
      }

      const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante } });
      if (!adotante) {
        return { success: false, message: "Adotante não encontrado" };
      }

      pet.adotante = adotante;
      pet.adotado = true;
      await this.repository.save(pet);
      return { success: true };
    }

  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]>{
    const pets = await this.repository.find({ where: { [campo]: valor } });
    return pets;
  }
   
 }
