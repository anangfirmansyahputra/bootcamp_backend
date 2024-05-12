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

    const {
      title,
      price,
      description,
      category_id,
      company,
      shipping,
      featured,
      stock,
      colors,
      images,
    } = await req.json();

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
        colors,
        images,
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
