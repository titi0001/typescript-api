import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { TipoRequestBodyAdotante } from "../../types/tiposAdotante";

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      "Celular inválido"
    ),
  senha: yup.string().defined().required().min(6),
  foto: yup.string().optional(),
});

const middlewareValidadorBodyAdotante = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await esquemaBodyAdotante.validate(req.body, { abortEarly: false });
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

export { middlewareValidadorBodyAdotante };
