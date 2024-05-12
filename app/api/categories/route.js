import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
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
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req, res) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        created_at: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
