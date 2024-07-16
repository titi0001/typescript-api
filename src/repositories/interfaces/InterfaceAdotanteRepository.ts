import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface interfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;

  listAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

  atulizaAdotante(
    id: number,
    adotante: AdotanteEntity
  ) : void | Promise<{success: boolean; message?: string  }> | void;

  deletaAdotante(id: number): Promise<{success: boolean; message?: string  }> | void;

  atulizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{success: boolean; message?: string  }> | void;
}
