import express from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { RequestHandler } from "express-serve-static-core";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyPet } from "../middleware/validadores/PetRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyPet(req, res, next);

router.post("/", validateBodyPet, (req, res) =>
  petController.criaPet(req, res)
);
router.get("/", (req, res) => petController.listaPets(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) =>
  petController.atualizaPet(req, res)
);
router.delete("/:id", verificaIdMiddleware, (req, res) =>
  petController.deletaPet(req, res)
);
router.put("/:pet_id/:adotante_id", verificaIdMiddleware, (req, res) =>
  petController.adotaPet(req, res)
);
router.get("/filtro", (req, res) =>
  petController.bucaPetPorCampoGenerico(req, res)
);

export default router;
