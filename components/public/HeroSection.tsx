import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-primary flex items-center overflow-hidden"
      aria-label="เปิดบ้านราชมงคล 2026"
    >
      {/* ── Blueprint grid background ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="bp-sm" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
          </pattern>
          <pattern id="bp-lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#bp-sm)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#60A5FA" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-lg)" />
      </svg>

      {/* ── Ambient glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 right-1/3 w-[480px] h-[480px] rounded-full bg-accent/20 blur-[140px] animate-pulse-glow"
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[360px] h-[360px] rounded-full bg-secondary/15 blur-[120px] animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* ── Floating geometric decorations ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Top-right slow-rotating dashed ring */}
        <div className="absolute top-10 right-10 w-28 h-28 animate-spin-slow opacity-30">
          <svg viewBox="0 0 112 112" fill="none">
            <circle cx="56" cy="56" r="50" stroke="#E94560" strokeWidth="1" strokeDasharray="5 10" />
          </svg>
        </div>
        {/* Bottom-left counter-rotating ring */}
        <div className="absolute bottom-20 left-16 w-20 h-20 animate-spin-reverse opacity-25">
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#F5A623" strokeWidth="1" strokeDasharray="3 7" />
          </svg>
        </div>
        {/* Floating triangle */}
        <div className="absolute top-1/3 left-8 w-14 h-14 animate-float opacity-20" style={{ animationDelay: '0.5s' }}>
          <svg viewBox="0 0 56 56" fill="none">
            <polygon points="28,4 52,48 4,48" stroke="#E94560" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Floating rotated square */}
        <div className="absolute bottom-1/3 right-12 w-10 h-10 animate-float opacity-25" style={{ animationDelay: '1.5s' }}>
          <svg viewBox="0 0 40 40" fill="none">
            <rect x="4" y="4" width="32" height="32" stroke="#F5A623" strokeWidth="1.5" transform="rotate(45 20 20)" />
          </svg>
        </div>
        {/* Floating dots */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-accent/50 animate-float" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-secondary/50 animate-float-md" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-2/5 w-2.5 h-2.5 rounded-full bg-blue-400/30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[45%] left-14 w-2 h-2 rounded-full bg-secondary/40 animate-float-delayed" />
        <div className="absolute top-[18%] right-[38%] w-3 h-3 rounded-full bg-accent/30 animate-float-md" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-[1fr_480px] gap-16 items-center">

        {/* Left: Text */}
        <div className="text-white">

          {/* Badge */}
          <div className="animate-fadeInUp">
            <span className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow inline-block" aria-hidden="true" />
              คณะศิลปกรรมและสถาปัตยกรรมศาสตร์ มทร.ล้านนา
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-display leading-tight text-balance animate-fadeInUp"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold">เปิดบ้าน</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-accent mt-1">ราชมงคล</span>
          </h1>

          <p
            className="text-2xl md:text-3xl font-display text-secondary mt-4 mb-5 animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
          >
            Open House 2026
          </p>

          <p
            className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            สัมผัสประสบการณ์ด้านศิลปกรรมและสถาปัตยกรรมอย่างใกล้ชิด
            เลือกกิจกรรมที่ใช่ และค้นพบหลักสูตรที่คุณชื่นชอบ
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fadeInUp"
            style={{ animationDelay: '0.4s' }}
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2.5 bg-accent text-white font-semibold px-10 py-4 rounded-full text-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(233,69,96,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              style={{ touchAction: 'manipulation' }}
            >
              ลงทะเบียนเข้าร่วม
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#activities"
              className="inline-flex items-center justify-center glass text-white font-semibold px-10 py-4 rounded-full text-lg transition-colors duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              style={{ touchAction: 'manipulation' }}
            >
              ดูกิจกรรมทั้งหมด
            </a>
          </div>

          {/* Stats */}
          <div
            className="mt-14 pt-10 border-t border-white/10 grid grid-cols-3 gap-8 max-w-sm animate-fadeInUp"
            style={{ animationDelay: '0.5s' }}
          >
            {[
              { label: 'หลักสูตร', value: '9', unit: 'สาขา' },
              { label: 'กิจกรรม', value: '9', unit: 'รายการ' },
              { label: 'ปีการศึกษา', value: '2026', unit: '' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display text-3xl font-bold text-secondary"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                {stat.unit && <div className="text-gray-600 text-xs">{stat.unit}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Right: SVG Illustration */}
        <div
          className="hidden lg:block animate-fadeInUp"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="relative">
            {/* ── Main SVG Illustration ── */}
            <svg
              viewBox="0 0 480 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              aria-hidden="true"
            >
              <defs>
                {/* Blueprint grid */}
                <pattern id="ill-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#60A5FA" strokeWidth="0.4" />
                </pattern>
                {/* Glow filters */}
                <filter id="glow-red" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-yellow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Radial gradient center glow */}
                <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E94560" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#1A1A2E" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background circle + grid */}
              <circle cx="240" cy="240" r="215" fill="#0D0D1C" opacity="0.7" />
              <circle cx="240" cy="240" r="215" fill="url(#ill-grid)" opacity="0.35" />
              <circle cx="240" cy="240" r="215" fill="url(#center-glow)" />

              {/* ── Outer rotating dashed ring ── */}
              <g
                style={{
                  animation: 'spin-slow 30s linear infinite',
                  transformOrigin: '240px 240px',
                  transformBox: 'fill-box',
                }}
              >
                <circle cx="240" cy="240" r="210" stroke="#E94560" strokeWidth="0.7" strokeDasharray="5 15" opacity="0.25" />
                <circle cx="240" cy="30" r="5" fill="#E94560" opacity="0.5" />
                <circle cx="240" cy="450" r="5" fill="#E94560" opacity="0.5" />
                <circle cx="30" cy="240" r="5" fill="#E94560" opacity="0.5" />
                <circle cx="450" cy="240" r="5" fill="#E94560" opacity="0.5" />
              </g>

              {/* ── Inner counter-rotating ring ── */}
              <g
                style={{
                  animation: 'spin-reverse 20s linear infinite',
                  transformOrigin: '240px 240px',
                  transformBox: 'fill-box',
                }}
              >
                <circle cx="240" cy="240" r="165" stroke="#F5A623" strokeWidth="0.6" strokeDasharray="2 8" opacity="0.18" />
              </g>

              {/* ── Architecture: Buildings ── */}
              {/* Centre tower */}
              <rect x="200" y="118" width="80" height="222" fill="#0A0A18" stroke="#60A5FA" strokeWidth="1.5" opacity="0.95" />
              {/* Tower accent top */}
              <rect x="200" y="113" width="80" height="7" fill="#E94560" opacity="0.85" />
              {/* Centre tower windows */}
              {[142, 168, 194, 220, 246, 272].map((y, i) => (
                <g key={i}>
                  <rect x="210" y={y} width="14" height="16" fill="#60A5FA" opacity={i % 2 === 0 ? 0.5 : 0.3} rx="1" />
                  <rect x="233" y={y} width="14" height="16" fill="#60A5FA" opacity={i % 2 === 1 ? 0.5 : 0.3} rx="1" />
                  <rect x="256" y={y} width="14" height="16" fill="#60A5FA" opacity={i % 2 === 0 ? 0.3 : 0.5} rx="1" />
                </g>
              ))}

              {/* Left building */}
              <rect x="118" y="198" width="66" height="142" fill="#0A0A18" stroke="#F5A623" strokeWidth="1.2" opacity="0.88" />
              <rect x="118" y="193" width="66" height="7" fill="#F5A623" opacity="0.65" />
              {[214, 242, 270].map((y, i) => (
                <g key={i}>
                  <rect x="128" y={y} width="12" height="14" fill="#F5A623" opacity="0.3" rx="1" />
                  <rect x="146" y={y} width="12" height="14" fill="#F5A623" opacity="0.22" rx="1" />
                  <rect x="164" y={y} width="12" height="14" fill="#F5A623" opacity="0.3" rx="1" />
                </g>
              ))}

              {/* Right building with gabled top */}
              <rect x="296" y="158" width="68" height="182" fill="#0A0A18" stroke="#E94560" strokeWidth="1.2" opacity="0.88" />
              <polygon points="296,158 330,118 364,158" fill="#0A0A18" stroke="#E94560" strokeWidth="1.2" opacity="0.88" />
              {[178, 204, 230, 256, 282].map((y, i) => (
                <g key={i}>
                  <rect x="306" y={y} width="11" height="14" fill="#E94560" opacity="0.25" rx="1" />
                  <rect x="322" y={y} width="11" height="14" fill="#E94560" opacity="0.2" rx="1" />
                  <rect x="338" y={y} width="11" height="14" fill="#E94560" opacity="0.25" rx="1" />
                </g>
              ))}

              {/* Ground plane */}
              <line x1="48" y1="340" x2="432" y2="340" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="240" y1="340" x2="48" y2="430" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <line x1="240" y1="340" x2="432" y2="430" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

              {/* ── Artistic / creative elements ── */}
              {/* Large art circle — top right */}
              <circle cx="342" cy="138" r="66" stroke="#E94560" strokeWidth="2" fill="rgba(233,69,96,0.07)" opacity="0.75" filter="url(#glow-red)" />
              <circle cx="342" cy="138" r="44" stroke="#E94560" strokeWidth="0.8" fill="none" opacity="0.4" strokeDasharray="3 6" />
              <circle cx="342" cy="138" r="9" fill="#E94560" opacity="0.7" filter="url(#glow-red)" />

              {/* Small art circle — bottom left */}
              <circle cx="128" cy="332" r="48" stroke="#F5A623" strokeWidth="1.5" fill="rgba(245,166,35,0.05)" opacity="0.65" />
              <circle cx="128" cy="332" r="11" fill="#F5A623" opacity="0.55" filter="url(#glow-yellow)" />

              {/* Paint brush strokes */}
              <path d="M 48 375 Q 145 348 240 368 Q 335 388 432 352" stroke="#E94560" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" />
              <path d="M 58 394 Q 152 416 240 400 Q 328 384 422 410" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3" />

              {/* Compass / measurement lines */}
              <line x1="342" y1="66" x2="342" y2="210" stroke="#60A5FA" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
              <line x1="268" y1="138" x2="416" y2="138" stroke="#60A5FA" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
              <g stroke="#60A5FA" strokeWidth="1.2" opacity="0.4">
                <line x1="342" y1="60" x2="342" y2="74" />
                <line x1="342" y1="202" x2="342" y2="216" />
                <line x1="262" y1="138" x2="276" y2="138" />
                <line x1="408" y1="138" x2="422" y2="138" />
              </g>

              {/* Floating triangle */}
              <g
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  transformOrigin: '402px 78px',
                  transformBox: 'fill-box',
                }}
              >
                <polygon points="402,58 424,96 380,96" stroke="#F5A623" strokeWidth="1.8" fill="rgba(245,166,35,0.12)" opacity="0.85" />
              </g>

              {/* Floating square */}
              <g
                style={{
                  animation: 'float 8s ease-in-out 1s infinite',
                  transformOrigin: '82px 178px',
                  transformBox: 'fill-box',
                }}
              >
                <rect x="66" y="162" width="32" height="32" stroke="#60A5FA" strokeWidth="1.5" fill="none" opacity="0.45" rx="2" />
              </g>

              {/* Floating glow dot */}
              <g
                style={{
                  animation: 'float 7s ease-in-out 2s infinite',
                  transformOrigin: '422px 304px',
                  transformBox: 'fill-box',
                }}
              >
                <circle cx="422" cy="304" r="9" fill="#E94560" opacity="0.55" filter="url(#glow-red)" />
              </g>

              {/* Drafting crosshairs */}
              <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.8">
                <line x1="155" y1="86" x2="170" y2="86" />
                <line x1="162" y1="79" x2="162" y2="93" />
              </g>
              <g stroke="#F5A623" strokeWidth="0.8" opacity="0.45">
                <line x1="396" y1="192" x2="408" y2="192" />
                <line x1="402" y1="186" x2="402" y2="198" />
              </g>

              {/* Architectural annotations */}
              <text x="56" y="200" fontSize="9" fill="#60A5FA" opacity="0.45" fontFamily="monospace" letterSpacing="1">ELEV. A-A</text>
              <text x="196" y="454" fontSize="8" fill="rgba(255,255,255,0.22)" fontFamily="monospace" letterSpacing="1">FAA RMUTL 2026</text>
            </svg>

            {/* Floating badge: Architecture */}
            <div
              className="absolute -top-6 -right-6 glass border border-white/20 rounded-2xl px-5 py-3 animate-float"
              style={{ animationDelay: '0.5s' }}
            >
              <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium">Faculty of</p>
              <p className="text-secondary font-bold font-display text-lg leading-none mt-0.5">Architecture</p>
            </div>

            {/* Floating badge: Fine Arts */}
            <div
              className="absolute -bottom-6 -left-6 glass border border-white/20 rounded-2xl px-5 py-3 animate-float-delayed"
            >
              <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium">Faculty of</p>
              <p className="text-accent font-bold font-display text-lg leading-none mt-0.5">Fine&nbsp;Arts</p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce" aria-hidden="true">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
