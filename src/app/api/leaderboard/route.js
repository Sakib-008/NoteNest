import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        notes: {
          include: {
            reviews: true,
            bookmarks: true,
            discussions: {
              include: {
                replies: true,
              },
            },
          },
        },
      },
    });

    const leaderboard = students
      .map((student) => {
        let reviews = 0;

        let bookmarks = 0;

        let replies = 0;

        student.notes.forEach((note) => {
          reviews += note.reviews.length;

          bookmarks += note.bookmarks.length;

          note.discussions.forEach((discussion) => {
            replies += discussion.replies.length;
          });
        });

        const score =
          student.notes.length * 10 + reviews * 2 + bookmarks + replies;

        return {
          id: student.id,

          name: student.fullName,

          department: student.department,

          score,
        };
      })

      .sort((a, b) => b.score - a.score);

    return NextResponse.json({
      success: true,

      leaderboard,
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
