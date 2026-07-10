import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalStudents = await prisma.student.count();

    const totalNotes = await prisma.note.count();

    const totalReviews = await prisma.review.count();

    const totalDiscussions = await prisma.discussion.count();

    const totalReplies = await prisma.reply.count();

    return NextResponse.json({
      success: true,

      data: {
        totalStudents,
        totalNotes,
        totalReviews,
        totalDiscussions,
        totalReplies,
      },
    });
  } catch (error) {
    console.log(error);

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
