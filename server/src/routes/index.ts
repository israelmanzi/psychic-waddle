import { Router } from "express";
import errorHandler from "../utils/errorHandler";
import { gameController } from "../controllers";

const routes = Router();

routes
  .get("/:id", errorHandler(gameController.getGame))
  .get("/recent", errorHandler(gameController.getRecentGames))
  .post("/record", errorHandler(gameController.recordGame));

export default routes;
