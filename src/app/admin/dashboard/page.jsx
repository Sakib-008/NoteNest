import DashboardCard from "@/components/admin/DashboardCard";
import ActivityWidget from "@/components/admin/ActivityWidget";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <DashboardCard title="Total Students" value="0" />

        <DashboardCard title="Total Notes" value="0" />

        <DashboardCard title="Total Reviews" value="0" />

        <DashboardCard title="Discussions" value="0" />
      </div>

      <div>
        <h2>Platform Activity</h2>

        <p>Activity information will appear here.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActivityWidget
            title="Students"
            value="0"
            description="Registered users"
          />

          <ActivityWidget
            title="Notes"
            value="0"
            description="Shared resources"
          />

          <ActivityWidget
            title="Community"
            value="0"
            description="Discussions and replies"
          />
        </div>
      </div>
    </div>
  );
}
