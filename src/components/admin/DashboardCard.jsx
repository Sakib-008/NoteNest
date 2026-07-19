export default function DashboardCard({ title, value }) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-[#EDE8DD] bg-[#FBFAF6] px-5 py-4">
      <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#557A6B]">
        {title}
      </span>
      <span
        className="text-xl font-medium text-[#1C1C1C]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {value}
      </span>
    </div>
  );
}