import { Request, Response } from "express";
import { getProducts } from "../services/productService";


export async function listProducts(req: Request, res: Response) {
  try {
    const data = await getProducts(req.query);

    const nextCursor =
      data.length > 0 ? data[data.length - 1].id : null;

    res.json({ data, nextCursor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
