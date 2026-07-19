import ActivityWidget from "@/components/admin/ActivityWidget";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminFooter from "@/components/admin/AdminFooter";

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/admin/dashboard", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load dashboard data");
  const json = await res.json();
  return json.data;
}

const iconProps = {
  viewBox: "0 0 24 24",
  className: "h-5 w-5 stroke-[#B89A5A]",
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const icons = {
  students: (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  ),
  notes: (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
    </svg>
  ),
  reviews: (
    <svg {...iconProps}>
      <polygon points="12 2.5 15 9 22 9.8 17 14.5 18.3 21.5 12 18 5.7 21.5 7 14.5 2 9.8 9 9" />
    </svg>
  ),
  discussions: (
    <svg {...iconProps}>
      <path d="M21 12a8 8 0 1 1-3.5-6.6" />
      <path d="M21 4v6h-6" transform="rotate(180 12 12)" />
    </svg>
  ),
  replies: (
    <svg {...iconProps}>
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  ),
};

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const stats = [
    { title: "Students", value: data.totalStudents, description: "Registered users", icon: icons.students },
    { title: "Notes", value: data.totalNotes, description: "Uploaded notes", icon: icons.notes },
    { title: "Reviews", value: data.totalReviews, description: "User feedback", icon: icons.reviews },
    { title: "Discussions", value: data.totalDiscussions, description: "Questions", icon: icons.discussions },
    { title: "Replies", value: data.totalReplies, description: "Community responses", icon: icons.replies },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F4EE]">
      <AdminNavbar />

      <main className="relative flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none fixed inset-x-0 top-0 h-40 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 39px, #2C4A3E 39px, #2C4A3E 40px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 rounded-sm border border-[#EDE8DD] bg-white px-6 py-6 shadow-[0_24px_64px_rgba(44,74,62,0.10)] sm:px-8">
            <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
              Administration
            </p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1
                  className="text-3xl font-medium leading-tight text-[#1C1C1C]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Dashboard
                </h1>
                <p className="mt-2 max-w-2xl text-sm font-light text-[#8A8A8A]">
                  A snapshot of activity across NoteNest — accounts, uploads,
                  and community engagement.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-full border border-[#EDE8DD] bg-[#FBFAF6] px-4 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#3D6355]" />
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#3D6355]">
                  Live overview
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#EDE8DD]" />
              <div className="h-1 w-1 rounded-full bg-[#B89A5A] opacity-60" />
              <div className="h-px flex-1 bg-[#EDE8DD]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {stats.map((stat) => (
              <ActivityWidget key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}