import DeleteNoteButton from "@/components/admin/DeleteNoteButton";

async function getNotes() {
  const res = await fetch("http://localhost:3000/api/admin/moderation", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.notes;
}

function isFlagged(note) {
  return note.averageRating < 2 || !note.title || !note.filePath;
}

export default async function ModerationPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Content Moderation</h1>

      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>

              <th>Course</th>

              <th>Department</th>

              <th>Action</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>

                <td>{note.courseCode}</td>

                <td>{note.department}</td>

                <td>
                  <DeleteNoteButton id={note.id} />
                </td>

                <td>
                  {isFlagged(note) ? <span>Flagged</span> : <span>Safe</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
