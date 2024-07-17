import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface interfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;

  listAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

  atulizaAdotante(id: number, adotante: AdotanteEntity): void;

  deletaAdotante(id: number): void;

  atulizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): void;
}
