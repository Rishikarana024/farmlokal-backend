import { db } from "../config/db";

export async function fetchProducts({
  cursor = 0,
  limit = 20,
  category,
  search,
  sort,
}: any) {
  let query = `
    SELECT id, name, price, category, created_at
    FROM products
    WHERE id > ?
  `;

  const params: any[] = [cursor];

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }

  if (search) {
    query += " AND name LIKE ?";
    params.push(`${search}%`);
  }

  const sortMap: any = {
    price: "price",
    name: "name",
    createdAt: "created_at",
  };

  query += sort && sortMap[sort]
    ? ` ORDER BY ${sortMap[sort]}`
    : " ORDER BY id";

  query += " LIMIT ?";
  params.push(Number(limit));

  const [rows] = await db.query(query, params);
  return rows as any[];
}
