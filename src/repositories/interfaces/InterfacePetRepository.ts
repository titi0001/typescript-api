import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface interfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPets(): Array<PetEntity> | Promise<PetEntity[]>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(
    id: number,
    pet: PetEntity
  ): Promise<{ success: boolean; message?: string }>;
  adotaPet(idPet: number, idAdotante: number): void;

  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]> | PetEntity[];
}
