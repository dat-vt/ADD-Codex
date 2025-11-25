import dotenv from "dotenv";
import { createApp } from "./app.js";
import { createPool } from "./db.js";

dotenv.config();

const port = Number(process.env.PORT || 4000);
const pool = createPool();
const app = createApp(pool);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Travel API listening on port ${port}`);
});
