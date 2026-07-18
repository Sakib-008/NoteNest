export default function StudentFooter() {
  return (
    <footer
      className="
bg-white
border-t
mt-10
px-8
py-6
"
    >
      <div
        className="
max-w-7xl
mx-auto
flex
flex-col
md:flex-row
justify-between
items-center
gap-4
"
      >
        <div>
          <h2
            className="
text-xl
font-bold
text-blue-600
"
          >
            NoteNest
          </h2>

          <p
            className="
text-gray-500
text-sm
mt-1
"
          >
            Share, discover and learn from student notes.
          </p>
        </div>

        <div
          className="
flex
gap-6
text-sm
text-gray-600
"
        >
          <a href="/search-notes" className="hover:text-blue-600">
            Home
          </a>

          <a href="/upload-notes" className="hover:text-blue-600">
            Upload Notes
          </a>

          <a href="/leaderboard" className="hover:text-blue-600">
            Leaderboard
          </a>
        </div>
      </div>

      <div
        className="
text-center
text-sm
text-gray-400
mt-5
"
      >
        © {new Date().getFullYear()} NoteNest. All rights reserved.
      </div>
    </footer>
  );
}
