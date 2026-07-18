import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-5xl font-bold text-blue-600">NoteNest</h1>

        <p className="mt-4 text-gray-600 text-lg">
          Student Notes Sharing Platform
        </p>

        <div className="mt-8 flex gap-5">
          <Link
            href="/login"
            className="
bg-blue-600
text-white
px-6
py-3
rounded-lg
"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
border
border-blue-600
text-blue-600
px-6
py-3
rounded-lg
"
          >
            Register
          </Link>
        </div>
      </section>
    </div>
  );
}
