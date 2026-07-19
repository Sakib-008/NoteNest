import AdminNavbar from "@/components/AdminNavbar";
import AdminFooter from "@/components/AdminFooter";
import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthGuard role="admin">
        <AdminNavbar />

        <main className="flex-1">{children}</main>

        <AdminFooter />
      </AuthGuard>
    </div>
  );
}
