import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import AbrigoEntity from "../entities/AbrigoEntity";

export async function verificaCelular<T extends { celular: string }>(
  repository: Repository<AdotanteEntity | AbrigoEntity>,
  celular: string
): Promise<any> {
  return repository.findOne({
    where: { celular },
  });
}

export async function verificaEmail<T extends { email: string }>(
  repository: Repository<AdotanteEntity | AbrigoEntity>,
  email: string
): Promise<any> {
  return repository.findOne({
    where: { email },
  });
}