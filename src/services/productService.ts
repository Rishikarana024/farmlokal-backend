import { fetchProducts } from "../repositories/productRepository";
import { getCache, setCache } from "../cache/productCache";

export async function getProducts(query: any) {
  const cacheKey = `products:${JSON.stringify(query)}`;

  const cached = await getCache(cacheKey);
  if (cached) {
    console.log("Cache hit");
    return cached;
  }

  const data = await fetchProducts(query);

  await setCache(cacheKey, data);
  console.log("Cached new data");

  return data;
}
