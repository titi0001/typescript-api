import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const tratarErroValidacaoYup = (
  esquema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  esquema
    .validate(req.body, { abortEarly: false })
    next();
  } catch (error) {
    const errosYup = error as yup.ValidationError;
    const errosDeValidacao: Record<string, string> = {};

    errosYup.inner.forEach((erro) => {
      if (erro.path) {
      errosDeValidacao[erro.path] = erro.message;
    }
  });
  res.status(400).json({ erros: errosDeValidacao }); 
  }
};

export default tratarErroValidacaoYup;

