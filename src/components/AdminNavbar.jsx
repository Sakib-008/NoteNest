"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("student");

    router.push("/login");
  }

  return (
    <nav
      className="
bg-gray-900
text-white
px-8
py-4
flex
justify-between
"
    >
      <h1
        className="
text-xl
font-bold
"
      >
        Admin Panel
      </h1>

      <div className="flex gap-6">
        <Link href="/admin/dashboard">Dashboard</Link>

        <Link href="/admin/moderation">Content Moderation</Link>
      </div>
    </nav>
  );
}
