import express from "express";

const router = express.Router();

router.get("/metrics", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

export default router;

