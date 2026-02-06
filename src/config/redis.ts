import { createClient } from "redis";

const redisUrl =
  process.env.REDIS_URL || "redis://host.docker.internal:6379";

export const redis = createClient({
  url: redisUrl,
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  await redis.connect();
  console.log("Redis connected");
})();
