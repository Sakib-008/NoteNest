import DashboardCard from "@/components/admin/DashboardCard";

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
      </div>
    </div>
  );
}
