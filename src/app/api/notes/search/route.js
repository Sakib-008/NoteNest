import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const keyword = searchParams.get("keyword") || "";
    const courseCode = searchParams.get("courseCode") || "";

    const normalizedCourseCode = courseCode.replace(/\s+/g, "").toLowerCase();

    const notes = await prisma.note.findMany({
      where: {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    const filteredNotes = notes.filter((note) => {
      const dbCourseCode = note.courseCode.replace(/\s+/g, "").toLowerCase();

      return dbCourseCode.includes(normalizedCourseCode);
    });

    return NextResponse.json(filteredNotes);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
