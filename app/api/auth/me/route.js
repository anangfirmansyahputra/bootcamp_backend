import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = req.headers;
    console.log(token);

    return NextResponse.json({});
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
