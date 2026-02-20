import { createClient } from '@/lib/supabase/server'
import HeroSection from '@/components/public/HeroSection'
import ActivityCard from '@/components/public/ActivityCard'
import SectionReveal from '@/components/public/SectionReveal'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = createClient()

  const { data: activities } = await supabase
    .from('activities')
    .select('*, programs(name, short_name, color, icon, slug)')
    .eq('is_active', true)
    .order('sort_order')

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Wave: primary → cream ── */}
      <div className="bg-primary" aria-hidden="true">
        <svg
          viewBox="0 0 1440 72"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,72 C320,16 760,60 1120,28 C1280,12 1380,44 1440,52 L1440,72 Z" fill="#F8F4EF" />
        </svg>
      </div>

      {/* ── Activities ── */}
      <div id="activities" className="relative overflow-hidden">

        {/* Subtle dot-grid background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="act-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#1A1A2E" opacity="0.07" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#act-dots)" />
        </svg>

        {/* Large faded decorative text */}
        <div
          className="absolute inset-x-0 top-8 text-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="font-display font-bold text-[clamp(80px,15vw,180px)] leading-none text-primary/[0.035] tracking-tighter">
            ACTIVITIES
          </span>
        </div>

        <section className="relative py-24 px-4 max-w-7xl mx-auto">

          {/* Section header */}
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-4">
                สำรวจกิจกรรม
              </span>

              <h2 className="font-display text-4xl md:text-5xl text-primary mb-3 text-balance">
                กิจกรรมทั้งหมด
              </h2>

              {/* Animated SVG underline — draws itself when section enters viewport */}
              <div className="flex justify-center mb-5" aria-hidden="true">
                <svg width="220" height="12" viewBox="0 0 220 12" fill="none">
                  <path
                    d="M4 7 Q55 2 110 7 Q165 12 216 6"
                    stroke="#E94560"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    className="animate-draw-path"
                  />
                  <circle cx="110" cy="7" r="3" fill="#E94560" opacity="0.5" />
                </svg>
              </div>

              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                เลือกกิจกรรมที่คุณสนใจและลงทะเบียนเข้าร่วมได้เลย
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {activities?.map((activity, i) => (
              <SectionReveal key={activity.id} delay={i * 90} className="h-full">
                <ActivityCard activity={activity} index={i} />
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="text-center mt-16">
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 bg-accent text-white font-semibold px-10 py-4 rounded-full text-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(233,69,96,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                style={{ touchAction: 'manipulation' }}
              >
                ลงทะเบียนเข้าร่วมกิจกรรม
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </SectionReveal>

        </section>
      </div>

      {/* ── About: cream → primary ── */}
      <section className="relative bg-primary text-white py-24 px-4 overflow-hidden">

        {/* SVG geometric pattern background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="about-bg" width="64" height="64" patternUnits="userSpaceOnUse">
              <circle cx="32" cy="32" r="28" fill="none" stroke="white" strokeWidth="0.5" />
              <line x1="0" y1="32" x2="64" y2="32" stroke="white" strokeWidth="0.3" />
              <line x1="32" y1="0" x2="32" y2="64" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-bg)" />
        </svg>

        {/* Accent glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <SectionReveal>

            {/* Faculty icon SVG */}
            <div className="flex justify-center mb-8" aria-hidden="true">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Building */}
                <rect x="22" y="26" width="36" height="40" stroke="#F5A623" strokeWidth="2" fill="none" rx="1" />
                {/* Roof */}
                <polygon points="22,26 40,10 58,26" stroke="#E94560" strokeWidth="2" fill="none" />
                {/* Door */}
                <rect x="34" y="48" width="12" height="18" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" rx="1" />
                {/* Windows */}
                <rect x="25" y="32" width="10" height="10" stroke="#60A5FA" strokeWidth="1.5" fill="rgba(96,165,250,0.1)" rx="1" />
                <rect x="45" y="32" width="10" height="10" stroke="#60A5FA" strokeWidth="1.5" fill="rgba(96,165,250,0.1)" rx="1" />
                {/* Art circle overlay */}
                <circle cx="64" cy="20" r="10" stroke="#E94560" strokeWidth="1.5" fill="rgba(233,69,96,0.1)" />
                <circle cx="16" cy="58" r="7" stroke="#F5A623" strokeWidth="1.5" fill="rgba(245,166,35,0.1)" />
              </svg>
            </div>

            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-4">
              เกี่ยวกับเรา
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">
              เกี่ยวกับคณะ
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              คณะศิลปกรรมและสถาปัตยกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
              มุ่งผลิตบัณฑิตด้านศิลปกรรมและสถาปัตยกรรมที่มีความเชี่ยวชาญทั้งทฤษฎีและปฏิบัติ
              พร้อมรับใช้สังคมและอุตสาหกรรมสร้างสรรค์
            </p>

            {/* Program highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              {[
                { icon: '🏛️', title: 'สถาปัตยกรรม', desc: '4 หลักสูตร' },
                { icon: '🎨', title: 'ศิลปกรรม', desc: '4 หลักสูตร' },
                { icon: '🎬', title: 'มีเดียอาร์ต', desc: '1 หลักสูตร' },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-gray-400 text-sm mt-1">{item.desc}</div>
                </div>
              ))}
            </div>

            <a
              href="https://faa.rmutl.ac.th"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary font-semibold px-8 py-3 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              style={{ touchAction: 'manipulation' }}
            >
              เยี่ยมชมเว็บไซต์คณะ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* ── Wave: primary → cream ── */}
      <div className="bg-primary" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#F8F4EF" />
        </svg>
      </div>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 max-w-3xl mx-auto">

        <SectionReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              FAQ
            </span>
            <h2 className="font-display text-4xl text-primary text-balance">
              คำถามที่พบบ่อย
            </h2>
          </div>
        </SectionReveal>

        <div className="space-y-4">
          {[
            {
              q: 'กิจกรรมจัดเมื่อไหร่?',
              a: 'งานเปิดบ้านราชมงคล 2026 จัดขึ้นในช่วงต้นปีการศึกษา 2026 ติดตามวันและเวลาจากประกาศอย่างเป็นทางการ',
              icon: '📅',
            },
            {
              q: 'ลงทะเบียนได้กี่กิจกรรม?',
              a: 'สามารถเลือกลงทะเบียนได้หลายกิจกรรม โดยต้องเลือกอย่างน้อย 1 กิจกรรม',
              icon: '✅',
            },
            {
              q: 'ถ้าต้องการแก้ไขข้อมูล ทำอย่างไร?',
              a: 'ติดต่อเจ้าหน้าที่คณะโดยตรง หรือส่ง email มาที่ faa@rmutl.ac.th',
              icon: '✏️',
            },
          ].map((faq, i) => (
            <SectionReveal key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-accent/20 hover:shadow-md transition-shadow duration-300 group">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5 flex-shrink-0" aria-hidden="true">{faq.icon}</span>
                  <div>
                    <h3 className="font-semibold text-primary text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── Wave: cream → primary ── */}
      <div className="bg-cream" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,40 C400,0 1040,60 1440,20 L1440,60 L0,60 Z" fill="#1A1A2E" />
        </svg>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-primary text-white pt-4 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-6 border-b border-white/10">
            <div>
              <p className="font-display text-2xl">เปิดบ้านราชมงคล 2026</p>
              <p className="text-gray-400 text-sm mt-2 max-w-xs leading-relaxed">
                คณะศิลปกรรมและสถาปัตยกรรมศาสตร์
                <br />มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
              </p>
            </div>
            <nav aria-label="ติดต่อ" className="text-sm text-gray-400 space-y-2">
              <p>
                <a href="tel:053921444" className="hover:text-white transition-colors duration-300">
                  โทร: 053-921-444
                </a>
              </p>
              <p>
                <a href="mailto:faa@rmutl.ac.th" className="hover:text-white transition-colors duration-300">
                  Email: faa@rmutl.ac.th
                </a>
              </p>
              <p>
                <a
                  href="https://faa.rmutl.ac.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors duration-300"
                >
                  faa.rmutl.ac.th ↗
                </a>
              </p>
            </nav>
          </div>
          <p className="text-gray-600 text-xs text-center mt-6">
            © 2026 คณะศิลปกรรมและสถาปัตยกรรมศาสตร์ มทร.ล้านนา. สงวนลิขสิทธิ์ทุกประการ
          </p>
        </div>
      </footer>

    </main>
  )
}
