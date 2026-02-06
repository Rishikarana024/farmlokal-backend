import { faker } from "@faker-js/faker";
import mysql from "mysql2/promise";

async function seed() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rishika@24680",
    database: "farmlokal",
  });

  const batchSize = 1000;
  const total = 10000; 

  for (let i = 0; i < total; i += batchSize) {
    const values = [];

    for (let j = 0; j < batchSize; j++) {
      values.push([
        faker.commerce.productName(),
        faker.commerce.productDescription(),
        faker.number.float({ min: 10, max: 1000 }),
        faker.commerce.department(),
      ]);
    }

    await db.query(
      "INSERT INTO products (name, description, price, category) VALUES ?",
      [values]
    );

    console.log(`Inserted ${i + batchSize}`);
  }

  console.log("Seeding complete!");
  process.exit();
}

seed();
