import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const courseCode = formData.get("courseCode");
    const department = formData.get("department");
    const semester = formData.get("semester");

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads/notes");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name}`;

    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const note = await prisma.note.create({
      data: {
        title,
        courseCode,
        department,
        semester,
        filePath: `/uploads/notes/${fileName}`,
      },
    });

    return NextResponse.json({
      message: "Notes Uploaded Successfully",
      note,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
