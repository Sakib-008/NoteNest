export default function ActivityWidget({ title, value, description, icon }) {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-[#EDE8DD] bg-white p-6 shadow-[0_8px_32px_rgba(44,74,62,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(44,74,62,0.10)]">
      <div className="absolute inset-x-0 top-0 h-0.75 bg-[#B89A5A] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#557A6B]">
            {title}
          </p>
          <p
            className="mt-3 text-3xl font-medium leading-none text-[#1C1C1C]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {value}
          </p>
          {description && (
            <p className="mt-2 text-xs font-light text-[#8A8A8A]">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#B89A5A]/40 bg-[#FBFAF6]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
