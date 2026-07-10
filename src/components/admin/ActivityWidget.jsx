export default function ActivityWidget({ title, value, description }) {
  return (
    <div className="rounded-sm border border-[#EDE8DD] bg-white px-5 py-5 shadow-[0_8px_32px_rgba(44,74,62,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4BA80] hover:shadow-[0_16px_40px_rgba(44,74,62,0.10)]">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#3D6355]">
        {title}
      </p>

      <p
        className="mt-3 text-3xl font-medium text-[#1C1C1C]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {value}
      </p>

      <p className="mt-2 text-sm font-light text-[#8A8A8A]">{description}</p>
    </div>
  );
}
