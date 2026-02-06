import axios from "axios";
import axiosRetry from "axios-retry";
import CircuitBreaker from "opossum";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 3000,
});

axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

async function fetchExternalProducts() {
  const res = await api.get("/products");
  return res.data;
}

const breaker = new CircuitBreaker(fetchExternalProducts, {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
});

export function getExternalProducts() {
  return breaker.fire();
}
