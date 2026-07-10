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

export async function DELETE(request) {
  try {
    const body = await request.json();

    const { id } = body;

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Content removed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Delete failed",
      },
      {
        status: 500,
      },
    );
  }
}
