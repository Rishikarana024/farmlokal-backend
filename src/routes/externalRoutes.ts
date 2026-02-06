import express from "express";
import { getExternalProducts } from "../integrations/externalApiClient";

const router = express.Router();

router.get("/external/products", async (req, res) => {
  try {
    const data = await getExternalProducts();
    res.json(data);
  } catch (err) {
    console.error("External API error:", err);
    res.status(503).json({ error: "External API unavailable" });
  }
});

export default router;
