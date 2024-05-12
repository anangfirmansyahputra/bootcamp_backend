import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { hashSync } from "bcrypt";
import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { name, email, password, role } = await req.json();

    const user = await db.user.create({
      data: {
        name,
        password: hashSync(password, 10),
        email,
        role,
      },
    });

    delete user.password;

    return NextResponse.json({
      ...user,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return new NextResponse("User already exists", { status: 400 });
    } else if (err instanceof PrismaClientValidationError) {
      return new NextResponse("User validation error", { status: 400 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
