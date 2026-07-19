import DeleteNoteButton from "@/components/admin/DeleteNoteButton";
import { prisma } from "@/lib/prisma";

async function getNotes() {
  const notes = await prisma.note.findMany({
    orderBy: {
      uploadedAt: "desc",
    },
  });

  return notes;
}

function isFlagged(note) {
  return note.averageRating < 2 || !note.title || !note.filePath;
}

export default async function ModerationPage() {
  let notes = [];
  try {
    notes = await getNotes();
  } catch {
    notes = [];
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F4EE]">
      <main className="relative flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none fixed inset-x-0 top-0 h-40 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 39px, #2C4A3E 39px, #2C4A3E 40px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* --- everything below is unchanged from what you had --- */}
          <div className="mb-8 rounded-sm border border-[#EDE8DD] bg-white px-6 py-6 shadow-[0_24px_64px_rgba(44,74,62,0.10)] sm:px-8">
            <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
              Administration
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1
                  className="text-3xl font-medium leading-tight text-[#1C1C1C]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Content Moderation
                </h1>
                <p className="mt-2 max-w-2xl text-sm font-light text-[#8A8A8A]">
                  Review uploaded notes and remove entries that do not meet the
                  quality threshold or are missing required content.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-full border border-[#EDE8DD] bg-[#FBFAF6] px-4 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#B89A5A]" />
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#3D6355]">
                  Moderation queue
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#EDE8DD]" />
              <div className="h-1 w-1 rounded-full bg-[#B89A5A] opacity-60" />
              <div className="h-px flex-1 bg-[#EDE8DD]" />
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-[#EDE8DD] bg-white shadow-[0_8px_32px_rgba(44,74,62,0.06)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#EDE8DD] px-6 py-4">
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#3D6355]">
                  Notes review table
                </p>
                <p className="mt-1 text-sm font-light text-[#8A8A8A]">
                  {notes.length} {notes.length === 1 ? "note" : "notes"} loaded
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#EDE8DD]">
                <thead className="bg-[#FBFAF6]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
                      Action
                    </th>
                    <th className="px-6 py-4 text-left text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EDE8DD] bg-white">
                  {notes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-sm font-light text-[#8A8A8A]"
                      >
                        No notes available for moderation.
                      </td>
                    </tr>
                  ) : (
                    notes.map((note) => (
                      <tr
                        key={note.id}
                        className="transition-colors hover:bg-[#FBFAF6]"
                      >
                        <td className="px-6 py-4 align-top">
                          <div className="max-w-xs">
                            <p className="line-clamp-2 text-sm font-medium text-[#1C1C1C]">
                              {note.title || "Untitled note"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top text-sm text-[#4A4A4A]">
                          {note.courseCode || "-"}
                        </td>
                        <td className="px-6 py-4 align-top text-sm text-[#4A4A4A]">
                          {note.department || "-"}
                        </td>
                        <td className="px-6 py-4 align-top">
                          <DeleteNoteButton id={note.id} />
                        </td>
                        <td className="px-6 py-4 align-top">
                          {isFlagged(note) ? (
                            <span className="inline-flex items-center rounded-full border border-[#C0392B]/20 bg-[#FDF2F2] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#C0392B]">
                              Flagged
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-[#557A6B]/20 bg-[#F7F4EE] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#557A6B]">
                              Safe
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
