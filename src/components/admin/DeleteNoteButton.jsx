"use client";

export default function DeleteNoteButton({ id }) {
  async function removeNote() {
    const confirmDelete = confirm("Are you sure you want to remove this note?");

    if (!confirmDelete) return;

    await fetch("/api/admin/moderation", {
      method: "DELETE",

      body: JSON.stringify({
        id,
      }),
    });

    window.location.reload();
  }

  return (
    <button
      onClick={removeNote}
      className="inline-flex items-center justify-center rounded-sm border border-[#EDE8DD] bg-white px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#C0392B] transition-colors hover:border-[#C0392B] hover:bg-[#FDF2F2]"
    >
      Remove
    </button>
  );
}
