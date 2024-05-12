import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const { name } = await req.json();

    if (!name) {
      return new NextResponse("Insert name of category", { status: 400 });
    }

    const category = await db.category.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function GET(req, res) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const categories = await db.category.findMany({
      orderBy: {
        created_at: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
