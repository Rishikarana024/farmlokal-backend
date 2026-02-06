import express from "express";
import "./config/redis";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import externalRoutes from "./routes/externalRoutes";
import webhookRoutes from "./routes/webhookRoutes";
import metricsRoutes from "./routes/metricsRoutes";
import { rateLimiter } from "./middleware/rateLimiter";

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/", metricsRoutes);

app.use("/", webhookRoutes);

app.use("/api", productRoutes);
app.use("/auth", authRoutes);
app.use("/", externalRoutes);

export default app;
