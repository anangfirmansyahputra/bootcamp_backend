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
      where: {
        featured: true,
      },
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
