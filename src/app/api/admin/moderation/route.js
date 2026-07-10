import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,

      notes,
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
