import { DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import * as relations from "../../drizzle/relations";

export const db = drizzle({
  connection: { connectionString: DATABASE_URL },
  schema: { ...schema, ...relations },
});
