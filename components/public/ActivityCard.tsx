interface Activity {
  id: string
  name: string
  display_name: string | null
  description: string | null
  location: string | null
  max_capacity: number | null
  programs: {
    name: string
    short_name: string
    color: string
    icon: string | null
    slug: string
  } | null
}

interface Props {
  activity: Activity
  index?: number
}

export default function ActivityCard({ activity, index = 0 }: Props) {
  const program = activity.programs
  const displayName = activity.display_name || activity.name
  const color = program?.color || '#E94560'

  return (
    /**
     * Outer div: `group` — controls glow (opacity) + card lift (-translate-y)
     * Article:   `group/card` — controls shimmer, bottom bar, CTA, icon
     */
    <div
      className="group relative h-full"
      style={{ '--glow-color': color } as React.CSSProperties}
    >
      {/* ── Colored glow layer behind card ── */}
      <div
        className="absolute -inset-3 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ backgroundColor: color + '38' }}
        aria-hidden="true"
      />

      <article
        className="group/card relative bg-white rounded-3xl overflow-hidden flex flex-col h-full group-hover:-translate-y-2 transition-transform duration-500"
        aria-label={displayName}
      >

        {/* ── Shimmer sweep (diagonal light sweep on hover) ── */}
        <div
          className="absolute inset-y-0 w-1/2 pointer-events-none z-20 -translate-x-full group-hover/card:translate-x-[280%] transition-transform duration-700 ease-in-out"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
          }}
          aria-hidden="true"
        >
          {/* skew applied via wrapper to keep transform composition clean */}
          <div className="absolute inset-0 -skew-x-[12deg] origin-center" />
        </div>

        {/* ── Colored header ── */}
        <div
          className="relative h-40 flex-shrink-0"
          style={{
            background: `linear-gradient(140deg, ${color} 0%, ${color}cc 100%)`,
          }}
        >
          {/* SVG decorative pattern */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 300 160"
            fill="none"
            aria-hidden="true"
          >
            {/* Large circle top-right */}
            <circle cx="270" cy="20" r="100" stroke="white" strokeWidth="0.7" opacity="0.18" />
            <circle cx="270" cy="20" r="68" stroke="white" strokeWidth="0.5" opacity="0.12" />
            {/* Dashed circle bottom-left */}
            <circle cx="22" cy="148" r="56" stroke="white" strokeWidth="0.7" strokeDasharray="3 7" opacity="0.14" />
            {/* Cross-hair grid lines */}
            <line x1="0" y1="80" x2="300" y2="80" stroke="white" strokeWidth="0.35" strokeDasharray="4 8" opacity="0.12" />
            <line x1="150" y1="0" x2="150" y2="160" stroke="white" strokeWidth="0.35" strokeDasharray="4 8" opacity="0.12" />
            {/* Blueprint corner bracket */}
            <rect x="8" y="8" width="22" height="22" stroke="white" strokeWidth="0.7" opacity="0.2" rx="2" />
            <line x1="8" y1="15" x2="30" y2="15" stroke="white" strokeWidth="0.4" opacity="0.15" />
            <line x1="15" y1="8" x2="15" y2="30" stroke="white" strokeWidth="0.4" opacity="0.15" />
            {/* Triangle accent */}
            <polygon points="262,128 284,152 240,152" stroke="white" strokeWidth="0.6" opacity="0.15" fill="none" />
          </svg>

          {/* Large faded index number */}
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-bold text-[76px] leading-none select-none text-white/10"
            style={{ fontVariantNumeric: 'tabular-nums' }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Program icon — scales + rotates on hover */}
          {program?.icon && (
            <div
              className="absolute left-5 top-1/2 -translate-y-1/2 text-5xl transition-transform duration-500 group-hover/card:scale-125 group-hover/card:-rotate-6"
              aria-hidden="true"
            >
              {program.icon}
            </div>
          )}

          {/* Program short name badge */}
          {program && (
            <span className="absolute bottom-3 right-4 inline-flex items-center bg-black/25 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
              {program.short_name}
            </span>
          )}
        </div>

        {/* ── Content body ── */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display font-bold text-primary text-xl leading-snug mb-3 min-w-0 break-words">
            {displayName}
          </h3>

          {activity.description && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1 min-w-0 break-words">
              {activity.description}
            </p>
          )}

          {/* ── Meta info + CTA ── */}
          <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
            {activity.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{activity.location}</span>
              </div>
            )}

            {activity.max_capacity && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                  รับสูงสุด {activity.max_capacity.toLocaleString()} คน
                </span>
              </div>
            )}

            {/* CTA — slides up from below on hover */}
            <div className="overflow-hidden h-8 mt-1" aria-hidden="true">
              <div
                className="flex items-center gap-1.5 text-sm font-semibold translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out"
                style={{ color }}
              >
                ดูรายละเอียด
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/card:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Growing bottom accent bar (scaleX: 0 → 1) ── */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 ease-out"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      </article>
    </div>
  )
}
