"use client";

import { useEffect, useState } from "react";

export default function SearchNotes() {
  const [keyword, setKeyword] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [notes, setNotes] = useState([]);

  async function fetchNotes() {
    const response = await fetch(
      `/api/notes/search?keyword=${keyword}&courseCode=${courseCode}`,
    );

    const data = await response.json();

    setNotes(data);
  }

  return (
    <div>
      <h1>Search Notes</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />

      <br />
      <br />

      <button onClick={fetchNotes}>Search</button>

      <hr />

      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>

          <p>{note.courseCode}</p>

          <a href={note.filePath} target="_blank">
            View PDF
          </a>
        </div>
      ))}
    </div>
  );
}
