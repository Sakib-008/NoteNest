"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/moderation", label: "Moderation" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    localStorage.removeItem("student");
    router.push("/admin-login");
  }

  return (
    <nav className="relative bg-[#2C4A3E] px-4 py-4 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 39px, #F7F4EE 39px, #F7F4EE 40px)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#B89A5A] bg-[#2C4A3E]">
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5 stroke-[#B89A5A]"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="13" y2="17" />
            </svg>
          </div>
          <div>
            <p
              className="text-base font-medium leading-none text-[#F7F4EE]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              NoteNest
            </p>
            <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[#B89A5A]">
              Admin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-7 sm:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors ${
                    active
                      ? "text-[#F7F4EE]"
                      : "text-[#F7F4EE]/55 hover:text-[#F7F4EE]/90"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-[1.5px] bg-[#B89A5A] transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            onClick={logout}
            className="rounded-sm border border-[#F7F4EE]/20 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#F7F4EE]/70 transition-colors hover:border-[#C0392B]/50 hover:text-[#C0392B]"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="relative mt-4 flex gap-6 sm:hidden">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.7rem] font-medium uppercase tracking-[0.16em] ${
                active ? "text-[#F7F4EE]" : "text-[#F7F4EE]/55"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
