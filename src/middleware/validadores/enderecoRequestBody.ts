import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import EnderecoEntity from "../../entities/Endereco";

yup.setLocale(pt);

const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  });

const middlewareValidadorBodyEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await esquemaBodyEndereco.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;

    const validationErros: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;

      validationErros[error.path] = error.message;
    });

    return res.status(400).json({ error: validationErros });
  }
};

export { middlewareValidadorBodyEndereco };
