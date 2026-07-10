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

    const reviews = await prisma.review.findMany({
      where: {
        noteId,
      },
    });

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await prisma.note.update({
      where: {
        id: noteId,
      },

      data: {
        averageRating,
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
