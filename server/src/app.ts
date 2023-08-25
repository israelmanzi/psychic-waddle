import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

const options = {
  origin: "*",
  optionsSuccessStatus: 200,
}

app.use(cors(options));
app.use(express.json());

app.use("/api/v1", routes);

export default app;
