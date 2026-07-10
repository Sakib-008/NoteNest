import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { discussionId, message } = await request.json();

    await prisma.reply.create({
      data: {
        discussionId,

        message,
      },
    });

    return NextResponse.json({
      message: "Reply Posted",
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
