import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createPool, ensureConnection } from "./db.js";
import { sampleDestinations, sampleItinerary } from "./sampleData.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT || 4000);
const pool = createPool();

const destinationsQuery = `
  SELECT id, country, name, summary, rating, duration, price
  FROM destinations
  ORDER BY rating DESC
  LIMIT 20;
`;

app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    await ensureConnection(pool);
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(200).json({ status: "ok", db: "offline", note: "using sample data" });
  }
});

app.get("/api/destinations", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(destinationsQuery);
    res.json({ items: rows });
  } catch (err) {
    res.json({ items: sampleDestinations, source: "sample" });
  }
});

app.get("/api/itinerary", (_req: Request, res: Response) => {
  res.json({ days: sampleItinerary });
});

app.post("/api/trip", async (req: Request, res: Response) => {
  const { city, dates, style, budget } = req.body ?? {};
  res.json({
    status: "drafted",
    title: `Sketch for ${city || "your next trip"}`,
    dates,
    style,
    budget,
    highlights: [
      "Boutique stay suggestions",
      "Day-by-day mood-board",
      "Dining map and reservations"
    ]
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Travel API listening on port ${port}`);
});
