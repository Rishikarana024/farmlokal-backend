import { db } from "./config/db";

async function test() {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("DB connected:", rows);
  } catch (error) {
    console.error(" DB connection failed:", error);
  } finally {
    process.exit();
  }
}

test();
