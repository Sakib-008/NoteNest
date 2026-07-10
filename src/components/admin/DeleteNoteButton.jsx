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

  return <button onClick={removeNote}>Remove</button>;
}
