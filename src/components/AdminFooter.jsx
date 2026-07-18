export default function AdminFooter() {
  return (
    <footer
      className="
bg-gray-900
text-gray-300
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
text-white
"
          >
            NoteNest Admin
          </h2>

          <p
            className="
text-sm
text-gray-400
mt-1
"
          >
            Platform management and monitoring panel
          </p>
        </div>

        <div
          className="
flex
gap-6
text-sm
"
        >
          <a href="/admin/dashboard" className="hover:text-white">
            Dashboard
          </a>

          <a href="/admin/moderation" className="hover:text-white">
            Moderation
          </a>
        </div>
      </div>

      <div
        className="
text-center
text-sm
text-gray-500
mt-5
"
      >
        Admin Panel © {new Date().getFullYear()} NoteNest
      </div>
    </footer>
  );
}
