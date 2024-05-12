import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();
  const files = formData.getAll("files");

  if (!files) {
    return new NextResponse("No files received.", { status: 400 });
  }

  try {
    let images = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );

      images.push(filename);
    }
    return NextResponse.json({
      images,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req, res) => {
  const { filename } = await req.json();

  if (!filename) {
    return new NextResponse("Filename is required.", { status: 400 });
  }

  try {
    // Hapus file dari sistem file server
    await unlink(path.join(process.cwd(), "public/uploads/" + filename));
    return new NextResponse("File deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Error occurred while deleting file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
