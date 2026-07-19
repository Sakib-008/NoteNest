"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  Search,
  Users,
  Trophy,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,

        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);

      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("student", JSON.stringify(data.student));

        router.push("/search-notes");
      } else {
        setErrors({
          general: data.message,
        });
      }
    } catch {
      setErrors({
        general: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
flex
bg-[#F7F4EE]
"
    >
      {/* LEFT SECTION */}

      <div
        className="
hidden
lg:flex
lg:w-1/2
bg-[#2C4A3E]
relative
overflow-hidden
flex-col
justify-between
p-14
text-[#F7F4EE]
"
      >
        {/* Decorative Elements */}

        <div
          className="
absolute
top-[-120px]
right-[-100px]
w-96
h-96
rounded-full
bg-[#B89A5A]/20
"
        />

        <div
          className="
absolute
bottom-[-100px]
left-[-80px]
w-80
h-80
rounded-full
bg-[#557A6B]/30
blur-3xl
"
        />

        {/* BRAND */}

        <div
          className="
relative
z-10
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
flex
items-center
justify-center
text-[#B89A5A]
"
          >
            <BookOpen size={25} />
          </div>

          <h1
            className="
text-3xl
font-serif
tracking-wide
"
          >
            NoteNest
          </h1>
        </div>

        {/* HERO */}

        <div
          className="
relative
z-10
max-w-lg
"
        >
          <p
            className="
text-xs
uppercase
tracking-[0.3em]
text-[#B89A5A]
mb-5
"
          >
            Student Knowledge Platform
          </p>

          <h2
            className="
text-5xl
font-serif
font-light
leading-tight
"
          >
            Share notes.
            <br />
            <span
              className="
italic
text-[#D4BA80]
"
            >
              Grow together.
            </span>
          </h2>

          <p
            className="
mt-6
text-[#F7F4EE]/70
leading-relaxed
max-w-md
"
          >
            A collaborative platform where students share resources, discover
            quality notes, and build knowledge together.
          </p>

          {/* FEATURES */}

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
                <Search size={20} />
              </div>

              <div>
                <p className="font-medium">Smart Search</p>

                <p className="text-sm text-[#F7F4EE]/60">
                  Find resources instantly
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
                <p className="font-medium">Student Community</p>

                <p className="text-sm text-[#F7F4EE]/60">
                  Learn with classmates
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
                <Trophy size={20} />
              </div>

              <div>
                <p className="font-medium">Contribution Leaderboard</p>

                <p className="text-sm text-[#F7F4EE]/60">
                  Get recognized for sharing
                </p>
              </div>
            </div>
          </div>
        </div>

        <p
          className="
relative
z-10
text-sm
text-[#F7F4EE]/50
"
        >
          © {new Date().getFullYear()} NoteNest
        </p>
      </div>

      {/* RIGHT LOGIN SECTION */}

      <div
        className="
w-full
lg:w-1/2
flex
items-center
justify-center
px-6
py-12
"
      >
        <div
          className="
w-full
max-w-md
"
        >
          <div
            className="
bg-white
rounded-3xl
shadow-[0_24px_64px_rgba(44,74,62,0.16)]
border
border-[#EDE8DD]
p-8
"
          >
            <div
              className="
mb-8
"
            >
              <h1
                className="
text-3xl
font-semibold
text-[#1C1C1C]
"
              >
                Welcome Back
              </h1>

              <p
                className="
mt-2
text-sm
text-[#8A8A8A]
"
              >
                Login to continue your learning journey.
              </p>
            </div>

            {/* GENERAL ERROR */}

            {errors.general && (
              <div
                className="
      mb-6
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
                {errors.general}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="
  space-y-6
  "
            >
              {/* EMAIL */}

              <div>
                <label
                  className="
block
text-sm
font-medium
text-[#1C1C1C]
mb-2
"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="
w-full
rounded-xl
border
border-[#EDE8DD]
bg-[#F7F4EE]/40
px-4
py-3.5
text-sm
text-[#1C1C1C]
outline-none
transition-all
duration-200
placeholder:text-[#8A8A8A]
focus:border-[#2C4A3E]
focus:ring-4
focus:ring-[#2C4A3E]/10
"
                />

                {errors.email && (
                  <p
                    className="
mt-2
text-xs
text-[#C0392B]
"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  className="
block
text-sm
font-medium
text-[#1C1C1C]
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
                    placeholder="Enter your password"
                    className="
w-full
rounded-xl
border
border-[#EDE8DD]
bg-[#F7F4EE]/40
px-4
py-3.5
pr-12
text-sm
text-[#1C1C1C]
outline-none
transition-all
duration-200
placeholder:text-[#8A8A8A]
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
transition
"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p
                    className="
mt-2
text-xs
text-[#C0392B]
"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* OPTIONS */}

              <div
                className="
flex
items-center
justify-between
"
              >
                <label
                  className="
flex
items-center
gap-2
text-sm
text-[#8A8A8A]
cursor-pointer
"
                >
                  <input
                    type="checkbox"
                    className="
w-4
h-4
rounded
border-[#EDE8DD]
accent-[#2C4A3E]
"
                  />
                  Remember me
                </label>

                <Link
                  href="#"
                  className="
text-sm
text-[#2C4A3E]
font-medium
hover:text-[#557A6B]
transition
"
                >
                  Forgot password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}

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
transition-all
duration-300
hover:shadow-[0_8px_32px_rgba(44,74,62,0.25)]
disabled:opacity-50
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
                ></span>

                <span
                  className="
relative
z-10
flex
items-center
gap-2
group-hover:text-[#2C4A3E]
transition
"
                >
                  {loading ? (
                    <>
                      <span
                        className="
w-5
h-5
rounded-full
border-2
border-[#F7F4EE]/40
border-t-[#F7F4EE]
animate-spin
"
                      />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight size={18} />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* REGISTER LINK */}

            <p
              className="
text-center
mt-8
text-sm
text-[#8A8A8A]
"
            >
              Don't have an account?
              <Link
                href="/register"
                className="
ml-2
font-semibold
text-[#2C4A3E]
hover:text-[#557A6B]
transition
"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
