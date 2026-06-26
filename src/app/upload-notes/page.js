"use client";

import { useState } from "react";

export default function UploadNotes() {
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("courseCode", courseCode);
    formData.append("department", department);
    formData.append("semester", semester);
    formData.append("file", file);

    const response = await fetch("/api/notes/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    alert(data.message);
  }

  return (
    <div>
      <h1>Upload Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <input
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />

        <br />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <br />

        <input
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        <br />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />
        <br />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
