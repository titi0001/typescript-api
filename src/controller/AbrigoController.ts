import { Request, Response } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../types/tiposAbrigo";
import AbrigoEntity from "../entities/AbrigoEntity";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}

  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { nome, celular, endereco, email, senha } = <AbrigoEntity>req.body;

    const novoAbrigo = new AbrigoEntity(
      nome,
      senha,
      email,
      celular,
      endereco
    );

    await this.repository.criaAbrigo(novoAbrigo);
    return res
      .status(201)
      .json({ data: { id: novoAbrigo.id, nome, celular, endereco, email } });
  }

  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const listaDeAbrigos = await this.repository.listAbrigos();
    const data = listaDeAbrigos.map(({ id, nome, celular, endereco, email }) => ({
      id,
      nome,
      celular,
      endereco: endereco !== null ? endereco : undefined,
      email
    }));
    return res.status(200).json({ data });
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atulizaAbrigo(
      Number(id),
      req.body as AbrigoEntity
    );

    return res.sendStatus(204);
  }

  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(204);
  }

}