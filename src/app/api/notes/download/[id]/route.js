import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        filePath: true,
      },
    });

    if (!note) {
      return new Response("Note Not Found", {
        status: 404,
      });
    }

    const isLoggedIn = true;

    if (!isLoggedIn) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const filePath = path.join(process.cwd(), "public", note.filePath);

    const file = await fs.readFile(filePath);

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${path.basename(note.filePath)}"`,
      },
    });
  } catch {
    return new Response("Server Error", {
      status: 500,
    });
  }
}
