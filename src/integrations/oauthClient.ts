import { redis } from "../config/redis";

const TOKEN_KEY = "oauth:access_token";
const LOCK_KEY = "oauth:lock";

async function fetchNewToken() {
  console.log("Fetching new OAuth token...");


  await new Promise((r) => setTimeout(r, 500));

  return `demo-token-${Date.now()}`;
}

export async function getAccessToken(): Promise<string> {

  const cached = await redis.get(TOKEN_KEY);
  if (cached) return cached;

  const lock = await redis.set(LOCK_KEY, "1", {
    NX: true,
    EX: 5,
  });

  if (!lock) {

    await new Promise((r) => setTimeout(r, 100));
    return getAccessToken();
  }

  const token = await fetchNewToken();

  await redis.setEx(TOKEN_KEY, 60, token);

  await redis.del(LOCK_KEY);

  return token;
}
