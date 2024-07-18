import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface interfaceAbrigoRepository {
  criaAbrigo(abrigo: AbrigoEntity): void | Promise<void>;

  listAbrigos(): AbrigoEntity[] | Promise<AbrigoEntity[]>;

  atulizaAbrigo(id: number, adotante: AbrigoEntity): void;

  deletaAbrigo(id: number): void;

  atulizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity): void;
}
