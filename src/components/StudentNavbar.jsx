"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { BookOpen, Search, Upload, Trophy, LogOut } from "lucide-react";

export default function StudentNavbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("student");

    router.push("/login");
  }

  return (
    <nav
      className="
sticky
top-0
z-50
bg-[#F7F4EE]/90
backdrop-blur-lg
border-b
border-[#EDE8DD]
"
    >
      <div
        className="
max-w-7xl
mx-auto
px-6
py-4
flex
items-center
justify-between
"
      >
        {/* LOGO */}

        <Link
          href="/"
          className="
flex
items-center
gap-3
"
        >
          <div
            className="
w-11
h-11
rounded-xl
bg-[#2C4A3E]
text-[#B89A5A]
flex
items-center
justify-center
"
          >
            <BookOpen size={22} />
          </div>

          <div>
            <h1
              className="
text-xl
font-bold
text-[#2C4A3E]
"
            >
              NoteNest
            </h1>

            <p
              className="
text-xs
text-[#8A8A8A]
"
            >
              Student Workspace
            </p>
          </div>
        </Link>

        {/* NAV LINKS */}

        <div
          className="
hidden
md:flex
items-center
gap-2
"
        >
          <Link
            href="/search-notes"
            className="
flex
items-center
gap-2
px-4
py-2.5
rounded-xl
text-sm
font-medium
text-[#4A4A4A]
hover:bg-[#EDE8DD]
hover:text-[#2C4A3E]
transition
"
          >
            <Search size={17} />
            Search Notes
          </Link>

          <Link
            href="/upload-notes"
            className="
flex
items-center
gap-2
px-4
py-2.5
rounded-xl
text-sm
font-medium
text-[#4A4A4A]
hover:bg-[#EDE8DD]
hover:text-[#2C4A3E]
transition
"
          >
            <Upload size={17} />
            Upload Notes
          </Link>

          <Link
            href="/leaderboard"
            className="
flex
items-center
gap-2
px-4
py-2.5
rounded-xl
text-sm
font-medium
text-[#4A4A4A]
hover:bg-[#EDE8DD]
hover:text-[#2C4A3E]
transition
"
          >
            <Trophy size={17} />
            Leaderboard
          </Link>

          <button
            onClick={logout}
            className="
flex
items-center
gap-2
ml-3
px-5
py-2.5
rounded-xl
bg-[#2C4A3E]
text-[#F7F4EE]
text-sm
font-medium
hover:bg-[#3D6355]
transition
"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
