import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { studentId, noteId } = await request.json();

    const existing = await prisma.bookmark.findFirst({
      where: {
        studentId,

        noteId,
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: {
          id: existing.id,
        },
      });

      return NextResponse.json({
        bookmarked: false,

        message: "Bookmark Removed",
      });
    }

    await prisma.bookmark.create({
      data: {
        studentId,

        noteId,
      },
    });

    return NextResponse.json({
      bookmarked: true,

      message: "Bookmark Added",
    });
  } catch {
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
