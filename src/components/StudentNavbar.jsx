"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentNavbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("student");

    router.push("/login");
  }

  return (
    <nav
      className="
bg-white
shadow
px-8
py-4
flex
justify-between
"
    >
      <h1
        className="
text-2xl
font-bold
text-blue-600
"
      >
        <Link href="/">NoteNest</Link>
      </h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>

        <Link href="/search-notes">Search Notes</Link>

        <Link href="/upload-notes">Upload Notes</Link>

        <Link href="/leaderboard">Leaderboard</Link>

        <button
          onClick={logout}
          className="
bg-red-500
text-white
px-4
py-2
rounded
"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
