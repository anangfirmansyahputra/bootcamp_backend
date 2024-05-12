import { db } from "lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import path from "path";
import { writeFile } from "fs/promises";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const products = await db.product.findMany({
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.log(err);

    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function POST(req) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const data = await req.formData();
    const title = data.get("title");
    const price = data.get("price");
    const description = data.get("description");
    const category_id = data.get("category_id");
    const company = data.get("company");
    const shipping = JSON.parse(data.get("shipping"));
    const featured = JSON.parse(data.get("featured"));
    const stock = data.get("stock");
    const colors = data.get("colors");
    const files = data.getAll("files");

    const category = await db.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Create products
    const products = await db.product.create({
      data: {
        user_id: decoded.id,
        company,
        price: Number(price),
        title,
        description,
        category_id,
        shipping,
        featured,
        stock: Number(stock),
        colors: colors.split(","),
      },
    });

    let images = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );

      images.push(filename);
    }

    await db.image.createMany({
      data: images.map((image) => ({
        product_id: products.id,
        url: `/uploads/${image}`,
      })),
    });

    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
