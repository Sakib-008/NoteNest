"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ShieldCheck,
  Users,
  FileCheck,
  BarChart3,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "admin",

          JSON.stringify({
            email: formData.email,

            role: "admin",
          }),
        );

        router.push("/admin/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
min-h-screen
flex
bg-[#F7F4EE]
"
    >
      {/* LEFT ADMIN BRAND PANEL */}

      <div
        className="
hidden
lg:flex
w-1/2
bg-[#2C4A3E]
relative
overflow-hidden
flex-col
justify-between
p-14
text-[#F7F4EE]
"
      >
        <div
          className="
absolute
w-96
h-96
rounded-full
bg-[#B89A5A]/20
blur-3xl
top-[-100px]
right-[-100px]
"
        />

        <div
          className="
flex
items-center
gap-3
"
        >
          <div
            className="
w-12
h-12
rounded-xl
border
border-[#B89A5A]
text-[#B89A5A]
flex
items-center
justify-center
"
          >
            <ShieldCheck size={26} />
          </div>

          <h1
            className="
text-3xl
font-bold
"
          >
            NoteNest Admin
          </h1>
        </div>

        <div>
          <p
            className="
uppercase
tracking-[0.3em]
text-xs
text-[#B89A5A]
mb-5
"
          >
            Administration Portal
          </p>

          <h2
            className="
text-5xl
font-light
leading-tight
"
          >
            Manage.
            <br />
            <span
              className="
italic
text-[#D4BA80]
"
            >
              Moderate.
            </span>
            <br />
            Grow.
          </h2>

          <p
            className="
mt-6
max-w-md
text-[#F7F4EE]/70
leading-relaxed
"
          >
            Control student resources, manage users, review uploaded notes, and
            maintain the quality of the NoteNest community.
          </p>

          <div
            className="
mt-10
space-y-5
"
          >
            <div
              className="
flex
items-center
gap-4
"
            >
              <div
                className="
w-10
h-10
rounded-lg
bg-white/10
flex
items-center
justify-center
"
              >
                <FileCheck size={20} />
              </div>

              <div>
                <p className="font-medium">Content Moderation</p>

                <p className="text-sm text-white/50">
                  Review uploaded resources
                </p>
              </div>
            </div>

            <div
              className="
flex
items-center
gap-4
"
            >
              <div
                className="
w-10
h-10
rounded-lg
bg-white/10
flex
items-center
justify-center
"
              >
                <Users size={20} />
              </div>

              <div>
                <p className="font-medium">User Management</p>

                <p className="text-sm text-white/50">Manage student accounts</p>
              </div>
            </div>

            <div
              className="
flex
items-center
gap-4
"
            >
              <div
                className="
w-10
h-10
rounded-lg
bg-white/10
flex
items-center
justify-center
"
              >
                <BarChart3 size={20} />
              </div>

              <div>
                <p className="font-medium">Platform Analytics</p>

                <p className="text-sm text-white/50">Track platform growth</p>
              </div>
            </div>
          </div>
        </div>

        <p
          className="
text-sm
text-white/40
"
        >
          © {new Date().getFullYear()} NoteNest Administration
        </p>
      </div>

      {/* LOGIN AREA */}

      <div
        className="
w-full
lg:w-1/2
flex
items-center
justify-center
px-6
"
      >
        <div
          className="
w-full
max-w-md
bg-white
rounded-3xl
border
border-[#EDE8DD]
shadow-[0_24px_64px_rgba(44,74,62,0.16)]
p-8
"
        >
          <div
            className="
text-center
mb-8
"
          >
            <div
              className="
mx-auto
w-14
h-14
rounded-2xl
bg-[#2C4A3E]
text-[#B89A5A]
flex
items-center
justify-center
mb-5
"
            >
              <Lock size={25} />
            </div>

            <h1
              className="
text-3xl
font-bold
text-[#1C1C1C]
"
            >
              Admin Login
            </h1>

            <p
              className="
mt-2
text-sm
text-[#8A8A8A]
"
            >
              Secure access to NoteNest dashboard
            </p>
          </div>

          {error && (
            <div
              className="
mb-5
rounded-xl
bg-red-50
border
border-red-100
px-4
py-3
text-sm
text-[#C0392B]
"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="
space-y-5
"
          >
            <div>
              <label
                className="
block
text-sm
font-medium
mb-2
"
              >
                Admin Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="
w-full
rounded-xl
border
border-[#EDE8DD]
bg-[#F7F4EE]/40
px-4
py-3.5
outline-none
focus:border-[#2C4A3E]
focus:ring-4
focus:ring-[#2C4A3E]/10
"
              />
            </div>

            <div>
              <label
                className="
block
text-sm
font-medium
mb-2
"
              >
                Password
              </label>

              <div
                className="
relative
"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="
w-full
rounded-xl
border
border-[#EDE8DD]
bg-[#F7F4EE]/40
px-4
py-3.5
pr-12
outline-none
focus:border-[#2C4A3E]
focus:ring-4
focus:ring-[#2C4A3E]/10
"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
absolute
right-4
top-1/2
-translate-y-1/2
text-[#8A8A8A]
hover:text-[#2C4A3E]
"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="
group
relative
overflow-hidden
w-full
flex
items-center
justify-center
gap-2
rounded-xl
bg-[#2C4A3E]
py-3.5
text-[#F7F4EE]
font-medium
hover:shadow-lg
transition
"
            >
              <span
                className="
absolute
inset-0
bg-[#B89A5A]
translate-x-[-100%]
group-hover:translate-x-0
transition-transform
duration-500
"
              />

              <span
                className="
relative
z-10
flex
items-center
gap-2
group-hover:text-[#2C4A3E]
"
              >
                {loading ? (
                  "Logging in..."
                ) : (
                  <>
                    Login
                    <ArrowRight size={18} />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
