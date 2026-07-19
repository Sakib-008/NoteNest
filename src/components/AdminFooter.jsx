export default function AdminFooter() {
  return (
    <footer className="border-t border-[#B89A5A]/20 bg-[#2C4A3E] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
        <p className="text-xs font-light text-[#F7F4EE]/50">
          Admin Panel &copy; {new Date().getFullYear()} NoteNest
        </p>

        <div className="flex items-center gap-2 text-xs font-light text-[#F7F4EE]/40">
          <span className="h-1 w-1 rounded-full bg-[#B89A5A]/60" />
          <span>Platform management and monitoring</span>
        </div>
      </div>
    </footer>
  );
}