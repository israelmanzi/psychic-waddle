import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", routes);

export default app;
