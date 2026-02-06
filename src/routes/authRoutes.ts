import express from "express";
import { getAccessToken } from "../integrations/oauthClient";

const router = express.Router();

router.get("/token", async (req, res) => {
  const token = await getAccessToken();
  res.json({ token });
});

export default router;
