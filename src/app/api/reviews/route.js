import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { noteId, rating, comment } = body;

    await prisma.review.create({
      data: {
        noteId,

        rating,

        comment,
      },
    });

    return NextResponse.json({
      message: "Review Submitted",
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
