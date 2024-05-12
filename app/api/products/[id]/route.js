import { db } from "lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import path from "path";
import { writeFile, unlink } from "fs/promises";

export async function GET(req, { params }) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const product = await db.product.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json(product);
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

    const product = await db.product.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

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

    const updateProduct = await db.product.update({
      where: {
        id: product.id,
      },
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

    return NextResponse.json(updateProduct);
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

    const product = await db.product.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    product.images.forEach(async (image) => {
      await unlink(path.join(process.cwd(), "public/uploads/" + image));
    });

    await db.product.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse("Product deleted", { status: 200 });
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
