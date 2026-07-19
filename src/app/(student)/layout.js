import StudentNavbar from "@/components/StudentNavbar";
import AuthGuard from "@/components/AuthGuard";
import StudentFooter from "@/components/StudentFooter";

export default function StudentLayout({ children }) {
  return (
    <AuthGuard role="student">
      <StudentNavbar />

      <main>{children}</main>

      <StudentFooter />
    </AuthGuard>
  );
}
