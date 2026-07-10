import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { noteId, question } = await request.json();

    await prisma.discussion.create({
      data: {
        noteId,

        question,
      },
    });

    return NextResponse.json({
      message: "Question Posted",
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
