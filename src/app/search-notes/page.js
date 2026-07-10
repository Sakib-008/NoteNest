"use client";

import { useState } from "react";

export default function SearchNotes() {
  const [keyword, setKeyword] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function fetchNotes() {
    setLoading(true);
    setError("");
    setSearched(false);
    try {
      const response = await fetch(
        `/api/notes/search?keyword=${encodeURIComponent(keyword)}&courseCode=${encodeURIComponent(courseCode)}`,
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setNotes(data);
      setSearched(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") fetchNotes();
  }

  function clearSearch() {
    setKeyword("");
    setCourseCode("");
    setNotes([]);
    setSearched(false);
    setError("");
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      {/* decorative ruled-paper texture */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-40 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 39px, #2C4A3E 39px, #2C4A3E 40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-14">

        {/* ── PAGE HEADER ── */}
        <div className="mb-10">
          <p className="text-[0.7rem] font-medium uppercase tracking-widest text-[#557A6B] mb-3">
            NoteNest
          </p>
          <h1
            className="text-4xl font-medium text-[#1C1C1C] leading-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Browse Notes
          </h1>
          <p className="text-sm text-[#8A8A8A] font-light max-w-md">
            Find lecture notes shared by your classmates — search by title or filter by course code.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 h-px bg-[#EDE8DD]" />
            <div className="h-1 w-1 rounded-full bg-[#B89A5A] opacity-60" />
            <div className="flex-1 h-px bg-[#EDE8DD]" />
          </div>
        </div>

        {/* ── SEARCH BAR CARD ── */}
        <div className="bg-white border border-[#EDE8DD] rounded-sm shadow-[0_8px_32px_rgba(44,74,62,0.08)] px-6 sm:px-8 py-7 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 relative">
              <label className="block text-[0.68rem] font-medium uppercase tracking-widest text-[#3D6355] mb-2">
                Search by Title
              </label>
              <div className="relative">
                <svg viewBox="0 0 24 24" className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 stroke-[#B89A5A] fill-none stroke-[1.5]">
                  <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. Markov Chains, DBMS…"
                  className="w-full bg-transparent border-0 border-b-[1.5px] border-[#EDE8DD] focus:border-[#2C4A3E] pl-6 pb-2 pt-1 text-sm text-[#1C1C1C] outline-none placeholder:text-[#C9C4B6] placeholder:font-light transition-colors"
                />
              </div>
            </div>

            <div className="sm:w-44 relative">
              <label className="block text-[0.68rem] font-medium uppercase tracking-widest text-[#3D6355] mb-2">
                Course Code
              </label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="CSE 3110"
                className="w-full bg-transparent border-0 border-b-[1.5px] border-[#EDE8DD] focus:border-[#2C4A3E] pb-2 pt-1 text-sm text-[#1C1C1C] outline-none placeholder:text-[#C9C4B6] placeholder:font-light transition-colors"
              />
            </div>

            <div className="flex gap-3 pb-0.5">
              {(keyword || courseCode) && (
                <button
                  onClick={clearSearch}
                  className="text-xs font-medium uppercase tracking-widest text-[#8A8A8A] hover:text-[#C0392B] border-b border-transparent hover:border-[#C0392B] transition-colors pb-0.5"
                >
                  Clear
                </button>
              )}
              <button
                onClick={fetchNotes}
                disabled={loading}
                className="group relative overflow-hidden rounded-sm bg-[#2C4A3E] px-6 py-2.5 text-[0.75rem] font-medium uppercase tracking-widest text-[#F7F4EE] transition-colors hover:text-[#2C4A3E] disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-[#B89A5A] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 flex items-center gap-2">
                  {loading && (
                    <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-[#F7F4EE]/30 border-t-[#F7F4EE]" />
                  )}
                  {loading ? "Searching…" : "Search"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ── ERROR STATE ── */}
        {error && (
          <div className="mb-6 border-l-[3px] border-[#C0392B] bg-white px-4 py-3 text-sm text-[#C0392B] rounded-sm shadow-[0_2px_8px_rgba(44,74,62,0.06)]">
            {error}
          </div>
        )}

        {/* ── RESULTS ── */}
        {searched && !loading && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs text-[#8A8A8A] font-light tracking-widest">
                {notes.length === 0
                  ? "No notes found"
                  : `${notes.length} ${notes.length === 1 ? "note" : "notes"} found`}
                {keyword && (
                  <span> for <span className="text-[#2C4A3E] font-medium">"{keyword}"</span></span>
                )}
              </p>
            </div>

            {notes.length === 0 ? (
              <div className="bg-white border border-[#EDE8DD] rounded-sm shadow-[0_4px_16px_rgba(44,74,62,0.06)] px-8 py-14 text-center">
                <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 stroke-[#EDE8DD] fill-none stroke-[1.5] mb-4">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="9" y1="13" x2="15" y2="13" strokeLinecap="round" />
                  <line x1="9" y1="17" x2="13" y2="17" strokeLinecap="round" />
                </svg>
                <p className="text-xl font-medium text-[#1C1C1C] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  No notes found
                </p>
                <p className="text-sm text-[#8A8A8A] font-light">
                  Try a different title or course code — or be the first to{" "}
                  <a href="/upload-notes" className="text-[#2C4A3E] font-medium border-b border-transparent hover:border-[#2C4A3E] transition-colors">
                    upload notes
                  </a>{" "}
                  for this topic.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                  <NoteCard key={note.id} note={note} onReviewSubmit={fetchNotes} />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── IDLE STATE ── */}
        {!searched && !loading && (
          <div className="text-center py-16">
            <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 stroke-[#EDE8DD] fill-none stroke-[1.5] mb-4">
              <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-[#C9C4B6] font-light tracking-widest">
              Search above to discover notes from your classmates
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── NOTE CARD ── */
function NoteCard({ note, onReviewSubmit }) {
  // Each card owns its own state — fixes shared-state bug from teammate's version
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");

  // Bookmark state
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [bookmarkMsg, setBookmarkMsg] = useState("");

  /* ── REVIEW SUBMIT ── */
  async function submitReview() {
    if (!comment.trim()) {
      setReviewError("Please write a comment before submitting.");
      return;
    }
    setSubmitting(true);
    setReviewError("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId: note.id, rating, comment }),
      });
      const data = await response.json();
      if (response.ok) {
        setReviewSuccess(true);
        setComment("");
        setRating(5);
        setShowReview(false);
        onReviewSubmit(); // refresh notes list to update averageRating
      } else {
        setReviewError(data.message || "Failed to submit review.");
      }
    } catch {
      setReviewError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Render filled/half/empty stars for display
  const avgRating = note.averageRating ?? 0;
  /* ── BOOKMARK TOGGLE ── */
  async function toggleBookmark() {
    setBookmarkLoading(true);
    setBookmarkMsg("");
    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // studentId: 1 kept as-is from teammate's backend contract
        body: JSON.stringify({ studentId: 1, noteId: note.id }),
      });
      const data = await response.json();
      if (response.ok) {
        setBookmarked(data.bookmarked);
        // flash a brief confirmation label then clear it after 2s
        setBookmarkMsg(data.bookmarked ? "Bookmarked!" : "Removed");
        setTimeout(() => setBookmarkMsg(""), 2000);
      } else {
        setBookmarkMsg(data.message || "Failed. Try again.");
      }
    } catch {
      setBookmarkMsg("Something went wrong.");
    } finally {
      setBookmarkLoading(false);
    }
  }

  async function postQuestion(noteId) {
    const response = await fetch("/api/discussions", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        noteId,

        question,
      }),
    });

    const data = await response.json();

    alert(data.message);
  }

  async function submitReply(discussionId) {
    const response = await fetch("/api/replies", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        discussionId,

        message: reply,
      }),
    });

    const data = await response.json();

    alert(data.message);
  }

  return (
    <div className="group bg-white border border-[#EDE8DD] rounded-sm shadow-[0_4px_16px_rgba(44,74,62,0.06)] p-6 flex flex-col gap-4 hover:shadow-[0_8px_32px_rgba(44,74,62,0.12)] hover:border-[#D4BA80] transition-all duration-200">

      {/* ── TOP ROW: doc icon + course code + bookmark ── */}
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#F7F4EE] border border-[#EDE8DD] group-hover:border-[#B89A5A] transition-colors">
          <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[#2C4A3E] fill-none stroke-[1.5]">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
            <line x1="8" y1="17" x2="13" y2="17" strokeLinecap="round" />
          </svg>
        </div>

        {/* course code badge + bookmark side by side */}
        <div className="flex items-center gap-2">
          {note.courseCode && (
            <span className="text-[0.65rem] font-medium uppercase tracking-widest text-[#557A6B] bg-[#F7F4EE] border border-[#EDE8DD] px-2 py-0.5 rounded-sm">
              {note.courseCode}
            </span>
          )}

          {/* ── BOOKMARK BUTTON ── */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleBookmark}
              disabled={bookmarkLoading}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark this note"}
              className={`flex items-center justify-center h-7 w-7 rounded-sm border transition-all duration-200 ${
                bookmarked
                  ? "bg-[#2C4A3E] border-[#2C4A3E]"
                  : "bg-transparent border-[#EDE8DD] hover:border-[#B89A5A]"
              } ${bookmarkLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {bookmarkLoading ? (
                /* tiny spinner while API call is in flight */
                <span className={`h-3 w-3 animate-spin rounded-full border-[1.5px] ${bookmarked ? "border-[#F7F4EE]/30 border-t-[#F7F4EE]" : "border-[#2C4A3E]/30 border-t-[#2C4A3E]"}`} />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className={`h-3.5 w-3.5 transition-all duration-200 ${
                    bookmarked
                      ? "fill-[#F7F4EE] stroke-[#F7F4EE]"
                      : "fill-none stroke-[#8A8A8A] group-hover:stroke-[#B89A5A]"
                  } stroke-2`}
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* ── flash confirmation tooltip ── */}
            {bookmarkMsg && (
              <span className="absolute -bottom-6 right-0 whitespace-nowrap text-[0.6rem] font-medium text-[#557A6B] tracking-wide">
                {bookmarkMsg}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── TITLE + META ── */}
      <div className="flex-1">
        <h3 className="text-base font-medium text-[#1C1C1C] leading-snug mb-1 line-clamp-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {note.title}
        </h3>
        {note.department && <p className="text-xs text-[#8A8A8A] font-light">{note.department}</p>}
        {note.semester && <p className="text-xs text-[#8A8A8A] font-light">{note.semester} Semester</p>}
      </div>

      {/* ── AVERAGE RATING DISPLAY ── */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${star <= Math.round(avgRating) ? "fill-[#B89A5A] stroke-[#B89A5A]" : "fill-none stroke-[#D4BA80]"} stroke-[1.5]`}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-[#8A8A8A] font-light">
          {avgRating > 0 ? avgRating.toFixed(1) : "No ratings yet"}
        </span>
      </div>

      <div className="h-px bg-[#EDE8DD]" />

      {/* ── REVIEW SECTION ── */}
      <div>
        <button
          onClick={() => { setShowReview(!showReview); setReviewSuccess(false); setReviewError(""); }}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#557A6B] hover:text-[#2C4A3E] transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current fill-none stroke-2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {showReview ? "Cancel" : "Leave a Review"}
        </button>

        {reviewSuccess && (
          <p className="mt-2 text-xs text-[#557A6B] font-medium flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current fill-none stroke-2">
              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Review submitted — thank you!
          </p>
        )}

        {showReview && (
          <div className="mt-4 flex flex-col gap-3">
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-widest text-[#3D6355] mb-2">Your Rating</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform hover:scale-110"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <svg viewBox="0 0 24 24" className={`h-6 w-6 stroke-[1.5] transition-colors ${star <= (hoveredStar || rating) ? "fill-[#B89A5A] stroke-[#B89A5A]" : "fill-none stroke-[#D4BA80]"}`}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
                <span className="ml-1 text-xs text-[#8A8A8A] font-light">
                  {["", "Poor", "Fair", "Good", "Great", "Excellent"][hoveredStar || rating]}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-widest text-[#3D6355] mb-2">Comment</p>
              <textarea
                value={comment}
                onChange={(e) => { setComment(e.target.value); setReviewError(""); }}
                placeholder="Share what made these notes helpful…"
                rows={3}
                className="w-full bg-[#F7F4EE] border border-[#EDE8DD] focus:border-[#2C4A3E] rounded-sm px-3 py-2.5 text-sm text-[#1C1C1C] font-light outline-none placeholder:text-[#C9C4B6] resize-none transition-colors"
              />
            </div>

            {reviewError && <p className="text-[0.7rem] text-[#C0392B]">{reviewError}</p>}

            <button
              type="button"
              onClick={submitReview}
              disabled={submitting}
              className="group/sub relative overflow-hidden self-end rounded-sm bg-[#2C4A3E] px-5 py-2 text-[0.7rem] font-medium uppercase tracking-widest text-[#F7F4EE] hover:text-[#2C4A3E] transition-colors duration-200 disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#B89A5A] transition-transform duration-300 ease-out group-hover/sub:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2">
                {submitting && <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-[#F7F4EE]/30 border-t-[#F7F4EE]" />}
                {submitting ? "Submitting…" : "Submit Review"}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="h-px bg-[#EDE8DD]" />

      {/* ── ACTION ROW: View + Download ── */}
      <div className="flex items-center justify-between gap-3">
        <a
          href={note.filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="group/view flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#557A6B] hover:text-[#2C4A3E] transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current fill-none stroke-2 transition-transform group-hover/view:translate-x-0.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          View
        </a>

        <a
          href={`/api/notes/download/${note.id}`}
          className="group/dl relative overflow-hidden flex items-center gap-1.5 rounded-sm bg-[#2C4A3E] px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-widest text-[#F7F4EE] hover:text-[#2C4A3E] transition-colors duration-200"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#B89A5A] transition-transform duration-300 ease-out group-hover/dl:translate-x-0" />
          <svg viewBox="0 0 24 24" className="relative z-10 h-3.5 w-3.5 stroke-current fill-none stroke-2 transition-transform group-hover/dl:translate-y-0.5">
            <path d="M12 4v12M12 16l-4-4M12 16l4-4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="relative z-10">Download</span>
        </a>
      </div>

    </div>
  );
}