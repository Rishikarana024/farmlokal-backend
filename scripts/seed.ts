import { faker } from "@faker-js/faker";
import { db } from "../src/config/db";


async function seed() {
  console.log("Seeding products...");

  const products = [];

  for (let i = 0; i < 1000; i++) {
    products.push([
      faker.commerce.productName(),
      faker.commerce.productDescription(),
      faker.commerce.price(),
      faker.commerce.department(),
    ]);
  }

  await db.query(
    `
    INSERT INTO products (name, description, price, category)
    VALUES ?
    `,
    [products]
  );

  console.log(" Seed complete");
  process.exit();
}

seed();
