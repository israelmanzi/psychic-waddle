import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

const corsAppliction = cors({
  origin: "*",
  credentials: true,
});

app.use(corsAppliction);
app.use(express.json());

app.use("/api/v1", routes);

export default app;
