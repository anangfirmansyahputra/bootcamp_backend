import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }
    return NextResponse.json(category);
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const { name } = await req.json();

    const updatedCategory = await db.category.update({
      where: {
        id: params.id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    await db.category.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
