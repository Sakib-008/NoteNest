import Link from "next/link";
import {
  Search,
  Upload,
  Bookmark,
  MessageCircle,
  Trophy,
  Star,
  Users,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Upload,
      title: "Share Notes",
      description:
        "Upload your class notes, assignments, and learning resources with other students.",
    },

    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find the right resources quickly by course, topic, department, and semester.",
    },

    {
      icon: Star,
      title: "Ratings & Reviews",
      description:
        "Discover the most helpful resources through student feedback.",
    },

    {
      icon: Bookmark,
      title: "Save Favorites",
      description: "Bookmark important notes and access them anytime.",
    },

    {
      icon: MessageCircle,
      title: "Academic Discussion",
      description: "Ask questions and collaborate with your classmates.",
    },

    {
      icon: Trophy,
      title: "Leaderboard",
      description: "Get recognized for your contribution to the community.",
    },
  ];

  return (
    <div
      className="
      min-h-screen
      bg-[#F7F4EE]
      text-[#1C1C1C]
      "
    >
      {/* NAVBAR */}

      <nav
        className="
        max-w-7xl
        mx-auto
        px-6
        py-6
        flex
        items-center
        justify-between
        "
      >
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
            bg-[#2C4A3E]
            text-[#B89A5A]
            flex
            items-center
            justify-center
            "
          >
            <BookOpen size={24} />
          </div>

          <h1
            className="
            text-2xl
            font-bold
            text-[#2C4A3E]
            "
          >
            NoteNest
          </h1>
        </div>

        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <Link
            href="/login"
            className="
            px-5
            py-2.5
            text-sm
            font-medium
            text-[#2C4A3E]
            hover:text-[#557A6B]
            "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="
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
            Register
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        pt-16
        pb-24
        grid
        lg:grid-cols-2
        gap-16
        items-center
        "
      >
        {/* LEFT CONTENT */}

        <div>
          <div
            className="
            inline-flex
            items-center
            gap-2
            bg-[#EDE8DD]
            text-[#2C4A3E]
            px-4
            py-2
            rounded-full
            text-sm
            mb-6
            "
          >
            <BookOpen size={16} />
            Student Knowledge Platform
          </div>

          <h1
            className="
            text-5xl
            lg:text-6xl
            font-bold
            leading-tight
            "
          >
            Share knowledge.
            <br />
            Learn together.
            <br />
            <span
              className="
              text-[#2C4A3E]
              "
            >
              Grow faster.
            </span>
          </h1>

          <p
            className="
            mt-6
            max-w-xl
            text-lg
            text-[#4A4A4A]
            leading-relaxed
            "
          >
            NoteNest is a student-powered platform where you can share class
            notes, discover study materials, discuss topics, and build a
            stronger learning community.
          </p>

          <div
            className="
            mt-8
            flex
            gap-4
            flex-wrap
            "
          >
            <Link
              href="/register"
              className="
              flex
              items-center
              gap-2
              bg-[#2C4A3E]
              text-[#F7F4EE]
              px-7
              py-3.5
              rounded-xl
              font-medium
              hover:bg-[#3D6355]
              transition
              "
            >
              Join NoteNest
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="
              px-7
              py-3.5
              rounded-xl
              border
              border-[#2C4A3E]
              text-[#2C4A3E]
              font-medium
              hover:bg-[#2C4A3E]
              hover:text-[#F7F4EE]
              transition
              "
            >
              Login
            </Link>
          </div>

          {/* STATS */}

          <div
            className="
            mt-12
            flex
            gap-10
            "
          >
            <div>
              <h3
                className="
                text-2xl
                font-bold
                text-[#2C4A3E]
                "
              >
                100+
              </h3>

              <p
                className="
                text-sm
                text-[#8A8A8A]
                "
              >
                Resources
              </p>
            </div>

            <div>
              <h3
                className="
                text-2xl
                font-bold
                text-[#2C4A3E]
                "
              >
                50+
              </h3>

              <p
                className="
                text-sm
                text-[#8A8A8A]
                "
              >
                Contributors
              </p>
            </div>

            <div>
              <h3
                className="
                text-2xl
                font-bold
                text-[#2C4A3E]
                "
              >
                10+
              </h3>

              <p
                className="
                text-sm
                text-[#8A8A8A]
                "
              >
                Departments
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD MOCKUP */}

        <div
          className="
          relative
          "
        >
          <div
            className="
            absolute
            inset-0
            bg-[#B89A5A]
            opacity-20
            blur-3xl
            rounded-full
            "
          />

          <div
            className="
            relative
            bg-white
            rounded-3xl
            shadow-[0_24px_64px_rgba(44,74,62,0.16)]
            border
            border-[#EDE8DD]
            p-6
            "
          >
            <div
              className="
              flex
              justify-between
              mb-6
              "
            >
              <h3
                className="
                font-semibold
                "
              >
                Student Dashboard
              </h3>

              <Users
                className="
                text-[#B89A5A]
                "
              />
            </div>

            {[
              "Data Structure Notes",
              "Database Management",
              "Software Engineering",
            ].map((item) => (
              <div
                key={item}
                className="
                  bg-[#F7F4EE]
                  rounded-xl
                  p-4
                  mb-3
                  flex
                  justify-between
                  "
              >
                <span
                  className="
                    text-sm
                    "
                >
                  {item}
                </span>

                <Star
                  size={18}
                  className="
                    text-[#B89A5A]
                    "
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        pb-24
        "
      >
        <div
          className="
          text-center
          mb-12
          "
        >
          <h2
            className="
            text-4xl
            font-bold
            "
          >
            Everything students need
          </h2>

          <p
            className="
            mt-3
            text-[#4A4A4A]
            "
          >
            One platform for sharing, discovering, and collaborating.
          </p>
        </div>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          "
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
              bg-white
              rounded-2xl
              border
              border-[#EDE8DD]
              p-6
              hover:shadow-[0_8px_32px_rgba(44,74,62,0.12)]
              transition
              "
              >
                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#EDE8DD]
                  text-[#2C4A3E]
                  flex
                  items-center
                  justify-center
                  mb-5
                  "
                >
                  <Icon size={24} />
                </div>

                <h3
                  className="
                  text-lg
                  font-semibold
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                  mt-2
                  text-sm
                  text-[#4A4A4A]
                  leading-relaxed
                  "
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
