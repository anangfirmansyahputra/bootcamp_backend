import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const products = await db.product.count();
    const orders = await db.order.count();
    const itemSold = await db.orderItems.aggregate({
      _sum: {
        quantity: true,
      },
    });
    const customers = await db.user.count({
      where: {
        role: "CUSTOMER",
      },
    });

    const dashboardData = [
      {
        id: 1,
        title: "Total Products",
        value: products,
      },
      {
        id: 2,
        title: "Total Orders",
        value: orders,
      },
      {
        id: 3,
        title: "Total Items Sold",
        value: itemSold._sum.quantity,
      },
      {
        id: 4,
        title: "Total Customers",
        value: customers,
      },
    ];

    return NextResponse.json(dashboardData);
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
