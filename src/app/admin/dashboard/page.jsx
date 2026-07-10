import ActivityWidget from "@/components/admin/ActivityWidget";

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/admin/dashboard", {
    cache: "no-store",
  });

  const json = await res.json();

  return json.data;
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
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
    </div>
  );
}
