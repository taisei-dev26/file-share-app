import { randomUUID } from "crypto";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const files = sqliteTable("files", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  fileName: text("fileName").notNull(),
  filepath: text("filePath").notNull(),
  contentType: text("contentType").notNull(),
  expiredAt: text("exporedAt").notNull(),
  createdAt: text("createdAt").notNull().$defaultFn(() => new Date().toISOString())
});