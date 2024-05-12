import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

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
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function PATCH(req, { params }) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

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
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

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
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return new NextResponse(
        "This category cannot be deleted because there are products associated with it. Please delete the associated products first before deleting the category.",
        { status: 400 }
      );
    } else {
      return new NextResponse("Internal  asdas Server Error", { status: 500 });
    }
  }
}
