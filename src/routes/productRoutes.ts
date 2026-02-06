import express from "express";
import { listProducts } from "../controllers/productController";

const router = express.Router();

router.get("/products", listProducts);

export default router;
