import { Router } from "express";
import errorHandler from "../utils/errorHandler";
import { gameController } from "../controllers";

const routes = Router();

routes
  .get("/game/:id", errorHandler(gameController.getGame))
  .get("/recent", errorHandler(gameController.getRecentGames))
  .post("/record", errorHandler(gameController.recordGame))
  .patch("/result/:id", errorHandler(gameController.updateGameResult));

export default routes;
