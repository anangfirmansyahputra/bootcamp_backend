import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { compareSync, hashSync } from "bcrypt";
import { db } from "lib/db";
import { NextResponse } from "next/server";

// Update user by id
export async function PATCH(req, { params }) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { name, email, password, role } = await req.json();

    const updatedUser = await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        email,
        role,
        password: hashSync(password, 10),
      },
    });

    delete updatedUser.password;

    return NextResponse.json(updatedUser);
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      return new NextResponse("User validation error", { status: 400 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

// Delete user by id
export async function DELETE(req, { params }) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    await db.user.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse("User deleted", { status: 204 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Find user by id
export async function GET(req, { params }) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    delete user.password;

    return new NextResponse(user);
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
