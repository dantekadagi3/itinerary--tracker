import { NextResponse } from "next/server";
import db from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parsing
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const quantity = formData.get("quantity") as string;
    const expiry_date = formData.get("expiry_date") as string;
    const image = formData.get("image") as File | null;

    let image_url = "";

    if (image) {
      // Define upload path inside public/uploads
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${randomUUID()}${path.extname(image.name)}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Ensure folder exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Save file
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      // Publicly accessible URL
      image_url = `/uploads/${filename}`;
    }

    const result = await db.query(
      "INSERT INTO products (name, image_url, quantity, expiry_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, image_url, quantity, expiry_date]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Database insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("❌ Database insert error:", error);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Database fetch error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("❌ Database fetch error:", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
