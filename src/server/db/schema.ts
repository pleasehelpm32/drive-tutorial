import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";
import { bigint } from "drizzle-orm/mysql-core";

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});
