import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request, { params }) {
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!note) {
      return new Response("Note Not Found", {
        status: 404,
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
