import express from "express";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { RequestHandler } from "express-serve-static-core";

const router = express.Router();

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);
const validateBody:RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next)

router.post("/", validateBody , (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req, res) => adotanteController.deletaAdotante(req, res));
router.patch("/:id", (req, res) => adotanteController.atualizaEnderecoAdotante(req, res));


export default router;
