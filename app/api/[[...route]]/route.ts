import { files } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/files", async (c) => {
  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );
  const filesResponse = await db.select().from(files);
  return c.json(filesResponse);
});

app.post("/upload", async (c) => {
  const formData = await c.req.formData();
  const fileData = formData.get("file");
  const expirationDays = formData.get("expiration");

  if (!fileData) {
    return c.json({ success: false, message: "ファイルがありません" }, 400);
  }

  const file = fileData as File;
  const fileName = file.name;
  const filePath = `upload/${Date.now()}-${fileName}`;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + Number(expirationDays));

  const db = drizzle(
    (getCloudflareContext().env as any).DB as unknown as D1Database
  );

  try {
    await db.insert(files).values({
      fileName,
      filePath,
      contentType: file.type,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    return c.json(
      { success: false, message: "ファイルの保存に失敗しました" },
      500
    );
  }

  return c.json({ success: true, message: "ファイルを保存しました" });
});

export const GET = handle(app);
export const POST = handle(app);