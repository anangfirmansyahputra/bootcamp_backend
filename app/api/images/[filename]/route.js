import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";

export const DELETE = async (req, { params }) => {
  try {
    await unlink(path.join(process.cwd(), "public/uploads/" + params.filename));
    return new NextResponse("File deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Error occurred while deleting file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
