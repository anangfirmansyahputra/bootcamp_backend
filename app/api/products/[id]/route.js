import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: params.id,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.log(err);
  }
}
