import Link from "next/link";

import { BookOpen, Search, Upload, Trophy } from "lucide-react";

export default function StudentFooter() {
  return (
    <footer
      className="
mt-16
bg-[#2C4A3E]
text-[#F7F4EE]
"
    >
      <div
        className="
max-w-7xl
mx-auto
px-6
py-12
grid
md:grid-cols-3
gap-10
"
      >
        {/* BRAND */}

        <div>
          <div
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
border
border-[#B89A5A]
text-[#B89A5A]
flex
items-center
justify-center
"
            >
              <BookOpen size={22} />
            </div>

            <h2
              className="
text-2xl
font-bold
"
            >
              NoteNest
            </h2>
          </div>

          <p
            className="
mt-4
text-sm
text-[#F7F4EE]/60
leading-relaxed
max-w-sm
"
          >
            A student-powered platform to share notes, discover resources, and
            collaborate with your academic community.
          </p>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h3
            className="
font-semibold
mb-5
text-[#B89A5A]
"
          >
            Explore
          </h3>

          <div
            className="
space-y-3
"
          >
            <Link
              href="/search-notes"
              className="
flex
items-center
gap-2
text-sm
text-[#F7F4EE]/70
hover:text-white
transition
"
            >
              <Search size={16} />
              Search Notes
            </Link>

            <Link
              href="/upload-notes"
              className="
flex
items-center
gap-2
text-sm
text-[#F7F4EE]/70
hover:text-white
transition
"
            >
              <Upload size={16} />
              Upload Notes
            </Link>

            <Link
              href="/leaderboard"
              className="
flex
items-center
gap-2
text-sm
text-[#F7F4EE]/70
hover:text-white
transition
"
            >
              <Trophy size={16} />
              Leaderboard
            </Link>
          </div>
        </div>

        {/* COMMUNITY */}

        <div>
          <h3
            className="
font-semibold
mb-5
text-[#B89A5A]
"
          >
            Community
          </h3>

          <p
            className="
text-sm
text-[#F7F4EE]/60
leading-relaxed
"
          >
            Contribute your knowledge, help fellow students, and grow together.
          </p>

          <div
            className="
mt-5
inline-flex
items-center
bg-white/10
rounded-full
px-4
py-2
text-sm
"
          >
            🎓 Learn. Share. Grow.
          </div>
        </div>
      </div>

      <div
        className="
border-t
border-white/10
py-5
text-center
text-sm
text-[#F7F4EE]/50
"
      >
        © {new Date().getFullYear()} NoteNest. All rights reserved.
      </div>
    </footer>
  );
}
