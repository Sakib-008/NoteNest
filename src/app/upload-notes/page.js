"use client";

import { useState, useRef } from "react";

export default function UploadNotes() {
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!courseCode.trim()) newErrors.courseCode = "Course code is required";
    if (!department.trim()) newErrors.department = "Department is required";
    if (!semester.trim()) newErrors.semester = "Semester is required";
    if (!file) newErrors.file = "Please attach a PDF file";
    else if (file.type !== "application/pdf") newErrors.file = "Only PDF files are accepted";
    return newErrors;
  }

  function handleFileSelect(selected) {
    if (!selected) return;
    setFile(selected);
    setErrors((prev) => ({ ...prev, file: "" }));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    handleFileSelect(dropped);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("courseCode", courseCode);
    formData.append("department", department);
    formData.append("semester", semester);
    formData.append("file", file);

    try {
      const response = await fetch("/api/notes/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrors({ general: data.message || "Upload failed. Please try again." });
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setCourseCode("");
    setDepartment("");
    setSemester("");
    setFile(null);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center px-4 py-12">
      {/* decorative top texture, echoes the ruled-paper motif from the landing page */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-40 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 39px, #2C4A3E 39px, #2C4A3E 40px)",
        }}
      />

      <div className="w-full max-w-xl">
        {submitted ? (
          /* ── SUCCESS STATE ── */
          <div className="bg-white border border-[#EDE8DD] rounded-sm shadow-[0_24px_64px_rgba(44,74,62,0.10)] px-10 py-14 text-center">
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#2C4A3E]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-[#2C4A3E] fill-none stroke-2">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2
              className="text-3xl font-medium text-[#1C1C1C] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Notes uploaded
            </h2>
            <p className="text-sm text-[#4A4A4A] font-light leading-relaxed max-w-sm mx-auto">
              Your notes for{" "}
              <span className="font-medium text-[#2C4A3E]">{courseCode || "this course"}</span>{" "}
              have been shared with your classmates.
            </p>
            <button
              onClick={resetForm}
              className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-[#2C4A3E] border-b border-transparent hover:border-[#2C4A3E] transition-colors pb-0.5"
            >
              Upload another file
            </button>
          </div>
        ) : (
          /* ── FORM CARD ── */
          <div className="bg-white border border-[#EDE8DD] rounded-sm shadow-[0_24px_64px_rgba(44,74,62,0.10)] px-8 sm:px-12 py-10 sm:py-12">
            {/* Header */}
            <div className="mb-9">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#557A6B] mb-3">
                Share with classmates
              </p>
              <h1
                className="text-3xl font-medium text-[#1C1C1C] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Upload Your Notes
              </h1>
              <p className="text-sm text-[#8A8A8A] font-light mt-2 max-w-md">
                Add a few details so your classmates can find this easily during revision.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex-1 h-px bg-[#EDE8DD]" />
                <div className="h-1 w-1 rounded-full bg-[#B89A5A] opacity-60" />
                <div className="flex-1 h-px bg-[#EDE8DD]" />
              </div>
            </div>

            {errors.general && (
              <div className="mb-6 border-l-[3px] border-[#C0392B] bg-[#FDF2F2] px-4 py-3 text-sm text-[#C0392B] rounded-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              {/* Title */}
              <Field
                label="Note Title"
                value={title}
                onChange={(v) => {
                  setTitle(v);
                  if (errors.title) setErrors((p) => ({ ...p, title: "" }));
                }}
                error={errors.title}
                placeholder="e.g. Stochastic Processes — Markov Chains"
              />

              {/* Course Code + Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field
                  label="Course Code"
                  value={courseCode}
                  onChange={(v) => {
                    setCourseCode(v);
                    if (errors.courseCode) setErrors((p) => ({ ...p, courseCode: "" }));
                  }}
                  error={errors.courseCode}
                  placeholder="CSE 3110"
                />
                <Field
                  label="Department"
                  value={department}
                  onChange={(v) => {
                    setDepartment(v);
                    if (errors.department) setErrors((p) => ({ ...p, department: "" }));
                  }}
                  error={errors.department}
                  placeholder="CSE"
                />
              </div>

              {/* Semester */}
              <div className="relative">
                <label
                  className={`absolute left-0 -top-2.5 text-[0.68rem] font-medium uppercase tracking-widest ${
                    errors.semester ? "text-[#C0392B]" : "text-[#3D6355]"
                  }`}
                >
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    if (errors.semester) setErrors((p) => ({ ...p, semester: "" }));
                  }}
                  className={`w-full bg-transparent border-0 border-b-[1.5px] pt-2 pb-2.5 text-sm text-[#1C1C1C] outline-none appearance-none cursor-pointer transition-colors ${
                    errors.semester ? "border-[#C0392B]" : "border-[#EDE8DD] focus:border-[#2C4A3E]"
                  }`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A8A8A' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 4px center",
                  }}
                >
                  <option value="" disabled hidden></option>
                  {semesters.map((s) => (
                    <option key={s} value={s}>
                      {s} Semester
                    </option>
                  ))}
                </select>
                {errors.semester && (
                  <span className="block mt-1.5 text-[0.7rem] text-[#C0392B]">{errors.semester}</span>
                )}
              </div>

              {/* File upload — drag and drop zone */}
              <div>
                <label className="block text-[0.68rem] font-medium uppercase tracking-widest text-[#3D6355] mb-2.5">
                  Attach PDF
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`group cursor-pointer rounded-sm border-[1.5px] border-dashed px-6 py-8 text-center transition-all duration-200 ${
                    errors.file
                      ? "border-[#C0392B] bg-[#FDF2F2]"
                      : dragActive
                      ? "border-[#2C4A3E] bg-[#F7F4EE]"
                      : file
                      ? "border-[#557A6B] bg-[#F7F4EE]"
                      : "border-[#EDE8DD] hover:border-[#B89A5A] hover:bg-[#FBFAF6]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  />

                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-[#2C4A3E] fill-none stroke-[1.5] shrink-0">
                        <path
                          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="text-left">
                        <p className="text-sm font-medium text-[#1C1C1C] truncate max-w-60">{file.name}</p>
                        <p className="text-xs text-[#8A8A8A]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="ml-2 text-[#8A8A8A] hover:text-[#C0392B] transition-colors"
                        aria-label="Remove file"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none stroke-2">
                          <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                          <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        className="mx-auto h-8 w-8 stroke-[#B89A5A] fill-none stroke-[1.5] mb-3 transition-transform group-hover:-translate-y-0.5"
                      >
                        <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-sm text-[#4A4A4A] font-light">
                        <span className="font-medium text-[#2C4A3E]">Click to browse</span> or drag a PDF here
                      </p>
                      <p className="text-xs text-[#8A8A8A] mt-1">PDF files only</p>
                    </>
                  )}
                </div>
                {errors.file && (
                  <span className="block mt-1.5 text-[0.7rem] text-[#C0392B]">{errors.file}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-sm bg-[#2C4A3E] py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-[#F7F4EE] transition-colors duration-200 hover:text-[#2C4A3E] disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#B89A5A] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {loading && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-[#F7F4EE]/30 border-t-[#F7F4EE]" />
                  )}
                  {loading ? "Uploading…" : "Upload Notes"}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable floating-label text field, consistent with the registration page */
function Field({ label, value, onChange, error, placeholder }) {
  return (
    <div className="relative">
      <label
        className={`absolute left-0 -top-2.5 text-[0.68rem] font-medium uppercase tracking-widest ${
          error ? "text-[#C0392B]" : "text-[#3D6355]"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-0 border-b-[1.5px] pt-2 pb-2.5 text-sm text-[#1C1C1C] outline-none placeholder:text-[#C9C4B6] placeholder:font-light transition-colors ${
          error ? "border-[#C0392B]" : "border-[#EDE8DD] focus:border-[#2C4A3E]"
        }`}
      />
      {error && <span className="block mt-1.5 text-[0.7rem] text-[#C0392B]">{error}</span>}
    </div>
  );
}