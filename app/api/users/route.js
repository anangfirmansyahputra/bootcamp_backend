import { db } from "lib/db";
import { NextResponse } from "next/server";
import { hashSync } from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(req, res) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const users = await db.user.findMany({});
    const deletePasswordUsers = users.map((user) => {
      delete user.password;
      return user;
    });

    return NextResponse.json(deletePasswordUsers);
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
    const { token } = await req.json();

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return NextResponse.json(user);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
