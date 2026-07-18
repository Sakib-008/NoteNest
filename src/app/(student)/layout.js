import StudentNavbar from "@/components/StudentNavbar";
import AuthGuard from "@/components/AuthGuard";

export default function StudentLayout({ children }) {
  return (
    <AuthGuard role="student">
      <StudentNavbar />

      <main>{children}</main>
    </AuthGuard>
  );
}
