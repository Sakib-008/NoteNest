import ActivityWidget from "@/components/admin/ActivityWidget";

async function getDashboardData() {
  const res = await fetch("/api/admin/dashboard", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load dashboard data");
  }

  const json = await res.json();

  return json.data;
}

export default async function AdminDashboard() {
  let data;

  try {
    data = await getDashboardData();
  } catch {
    data = {
      totalStudents: 0,
      totalNotes: 0,
      totalReviews: 0,
      totalDiscussions: 0,
      totalReplies: 0,
    };
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] px-4 py-10 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-40 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 39px, #2C4A3E 39px, #2C4A3E 40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 rounded-sm border border-[#EDE8DD] bg-white px-6 py-6 shadow-[0_24px_64px_rgba(44,74,62,0.10)] sm:px-8">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#557A6B] mb-3">
            Administration
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1
                className="text-3xl font-medium text-[#1C1C1C] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Admin Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-light text-[#8A8A8A]">
                Track the core activity across the platform from one place. The
                metrics below are loaded directly from the admin dashboard API.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-[#EDE8DD] bg-[#FBFAF6] px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#557A6B]" />
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#3D6355]">
                Live overview
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 h-px bg-[#EDE8DD]" />
            <div className="h-1 w-1 rounded-full bg-[#B89A5A] opacity-60" />
            <div className="flex-1 h-px bg-[#EDE8DD]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <ActivityWidget
            title="Students"
            value={data.totalStudents}
            description="Registered users"
          />

          <ActivityWidget
            title="Notes"
            value={data.totalNotes}
            description="Uploaded notes"
          />

          <ActivityWidget
            title="Reviews"
            value={data.totalReviews}
            description="User feedback"
          />

          <ActivityWidget
            title="Discussions"
            value={data.totalDiscussions}
            description="Questions"
          />

          <ActivityWidget
            title="Replies"
            value={data.totalReplies}
            description="Community responses"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-sm border border-[#EDE8DD] bg-white px-6 py-6 shadow-[0_8px_32px_rgba(44,74,62,0.06)]">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#3D6355]">
              Activity snapshot
            </p>
            <h2
              className="mt-2 text-2xl font-medium text-[#1C1C1C]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Community engagement at a glance
            </h2>
            <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-[#8A8A8A]">
              Use these counts to monitor growth in uploads and participation.
              The dashboard is intentionally minimal so the key signals remain
              easy to scan.
            </p>
          </div>

          <div className="rounded-sm border border-[#EDE8DD] bg-[#FBFAF6] px-6 py-6 shadow-[0_8px_32px_rgba(44,74,62,0.06)]">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#3D6355]">
              Status
            </p>
            <div className="mt-4 space-y-3 text-sm text-[#4A4A4A]">
              <div className="flex items-center justify-between gap-4 border-b border-[#EDE8DD] pb-3">
                <span>Data source</span>
                <span className="font-medium text-[#1C1C1C]">/api/admin/dashboard</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[#EDE8DD] pb-3">
                <span>Refresh mode</span>
                <span className="font-medium text-[#1C1C1C]">No cache</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Fallback state</span>
                <span className="font-medium text-[#1C1C1C]">Safe zeros</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
