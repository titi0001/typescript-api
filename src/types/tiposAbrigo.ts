import AbrigoEntity from "../entities/AbrigoEntity";

type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id" | "pets">;

type TipoRequestParamsAbrigo = { id?: string };

type TipoResponseBodyAbrigo = {
  data?:
    | Pick<AbrigoEntity, "id" | "nome" | "celular" | "endereco" | "email">
    | Pick<AbrigoEntity, "id" | "nome" | "celular" | "endereco" | "email">[];
};

export {
  TipoRequestBodyAbrigo,
  TipoResponseBodyAbrigo,
  TipoRequestParamsAbrigo,
}