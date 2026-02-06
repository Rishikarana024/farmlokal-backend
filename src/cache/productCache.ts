import { redis } from "../config/redis";

export async function getCache(key: string) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key: string, value: any) {
  await redis.setEx(key, 60, JSON.stringify(value));
}
