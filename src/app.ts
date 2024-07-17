import "express-async-errors"; 
import express from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { erroMiddleware } from "./middleware/erro";

const app = express();
app.use(express.json());
router(app);

app.get("/teste", () => {
  throw new Error("Erro ao acessar a rota");
})

app.use(erroMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
