import AdminNavbar from "@/components/AdminNavbar";
import AdminFooter from "@/components/AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />

      <main className="flex-1">{children}</main>

      <AdminFooter />
    </div>
  );
}
