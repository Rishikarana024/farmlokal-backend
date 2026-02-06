import express from "express";
import { redis } from "../config/redis";

const router = express.Router();

router.post("/webhook/order-update", async (req, res) => {
  const eventId = req.body.eventId;

  if (!eventId) {
    return res.status(400).json({ error: "Missing eventId" });
  }

  const key = `webhook:${eventId}`;

  const exists = await redis.get(key);

  if (exists) {
    console.log("Duplicate webhook ignored:", eventId);
    return res.json({ status: "duplicate ignored" });
  }

  await redis.setEx(key, 86400, "processed");

  console.log("Processing webhook:", eventId);

  await new Promise((r) => setTimeout(r, 500));

  res.json({ status: "processed" });
});

export default router;
