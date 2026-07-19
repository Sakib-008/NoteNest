"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children, role }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    function checkAuth() {
      let storedUser = null;

      // Student authentication
      if (role === "student") {
        storedUser = localStorage.getItem("student");
      }

      // Admin authentication
      else if (role === "admin") {
        storedUser = localStorage.getItem("admin");
      }

      // If no role specified
      else {
        storedUser =
          localStorage.getItem("student") || localStorage.getItem("admin");
      }

      if (!storedUser) {
        if (role === "admin") {
          router.replace("/admin-login");
        } else {
          router.replace("/login");
        }

        return;
      }

      const user = JSON.parse(storedUser);

      if (role && user.role !== role) {
        if (role === "admin") {
          router.replace("/admin-login");
        } else {
          router.replace("/login");
        }

        return;
      }

      setAuthorized(true);
      setLoading(false);
    }

    checkAuth();
  }, [router, role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return children;
}
