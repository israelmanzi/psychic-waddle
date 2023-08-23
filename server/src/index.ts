import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT as string);

app.listen(port, () => {
  console.log(
    `Server running on port ::${port} in ${process.env.NODE_ENV} mode`
  );
});
