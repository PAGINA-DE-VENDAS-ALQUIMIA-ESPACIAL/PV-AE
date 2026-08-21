import React from 'react';
import { Flag, BarChart3, Package, ArrowUpRight } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      number: '1',
      title: 'General concept',
      description: 'Far far away, behind mountains, far from the countries Vokalia.',
      icon: Flag,
      // Node position in viewBox (0 0 1000 320)
      x: '19%',
      y: '220px',
      align: 'text-left',
    },
    {
      number: '2',
      title: 'Post product',
      description: 'Far far away, behind mountains, far from the countries Vokalia.',
      icon: BarChart3,
      x: '51%',
      y: '90px',
      align: 'text-left',
    },
    {
      number: '3',
      title: 'Design process',
      description: 'Far far away, behind mountains, far from the countries Vokalia.',
      icon: Package,
      x: '82%',
      y: '170px',
      align: 'text-left',
    },
  ];

  return (
    <section className="w-full bg-black text-white min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative overflow-hidden font-['DM_Sans'] select-none">
      
      {/* HEADER BAR */}
      <div className="w-full max-w-7xl mx-auto flex items-start justify-between relative z-10">
        <div className="flex-1 text-center">
          {/* Subtitle / Brand Tag */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400 font-medium mb-3">
            <span className="w-6 h-[1.5px] bg-cyan-400 inline-block"></span>
            <span>e22entials.</span>
            <span className="w-6 h-[1.5px] bg-cyan-400 inline-block"></span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Process section<span className="text-cyan-400">.</span>
          </h2>
        </div>

        {/* Top Right Watermark Number (362) */}
        <div className="absolute top-0 right-0 text-7xl sm:text-8xl font-bold text-white/5 tracking-tighter pointer-events-none select-none font-sans">
          362
        </div>
      </div>

      {/* PROCESS WAVE & STEPS CONTAINER */}
      <div className="w-full max-w-6xl mx-auto my-12 lg:my-16 relative min-h-[420px] flex items-center justify-center">
        
        {/* SVG Curved Path (Connecting line) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 320"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Cyan / Blue Gradient Line */}
              <linearGradient id="cyanLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
                <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
              </linearGradient>

              {/* Faint Parallel Line Gradient */}
              <linearGradient id="faintLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
              </linearGradient>

              {/* Node Shadow / Glow */}
              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Faint Secondary Curve Line (Architectural feel) */}
            <path
              d="M 50,220 C 100,245 140,230 190,230 C 280,230 380,100 510,100 C 640,100 710,220 820,180 C 880,155 920,210 960,230"
              fill="none"
              stroke="url(#faintLineGradient)"
              strokeWidth="2"
            />

            {/* Main Primary Glowing Curve Line */}
            <path
              d="M 60,210 C 110,235 150,220 190,220 C 280,220 380,90 510,90 C 640,90 710,210 820,170 C 880,145 920,200 950,220"
              fill="none"
              stroke="url(#cyanLineGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#cyanGlow)"
            />
          </svg>
        </div>

        {/* DESKTOP/TABLET GRID OVERLAY FOR NODES & CONTENT */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10 pt-8 pb-12">
          
          {/* STEP 1 */}
          <div className="flex flex-col items-start md:items-start relative group">
            {/* Step Node Icon Badge */}
            <div className="mb-6 md:mb-12 self-start md:ml-[15%] transition-transform duration-300 hover:scale-110">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-[0_0_25px_rgba(56,189,248,0.3)] flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-300">
                <Flag className="w-6 h-6 text-sky-600 stroke-[2.2]" />
              </div>
            </div>

            {/* Content Box with Watermark Number */}
            <div className="relative pt-2 max-w-xs">
              <div className="absolute -top-10 left-0 text-7xl sm:text-8xl font-bold text-white/[0.07] pointer-events-none leading-none select-none font-sans">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight relative z-10">
                General concept
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed relative z-10 font-normal">
                Far far away, behind mountains, far from the countries Vokalia.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col items-start md:items-start relative group md:-mt-16">
            {/* Step Node Icon Badge */}
            <div className="mb-6 md:mb-12 self-start md:ml-[25%] transition-transform duration-300 hover:scale-110">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-[0_0_25px_rgba(56,189,248,0.3)] flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-all duration-300">
                <BarChart3 className="w-6 h-6 text-sky-600 stroke-[2.2]" />
              </div>
            </div>

            {/* Content Box with Watermark Number */}
            <div className="relative pt-2 max-w-xs">
              <div className="absolute -top-10 left-0 text-7xl sm:text-8xl font-bold text-white/[0.07] pointer-events-none leading-none select-none font-sans">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight relative z-10">
                Post product
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed relative z-10 font-normal">
                Far far away, behind mountains, far from the countries Vokalia.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-col items-start md:items-start relative group md:mt-8">
            {/* Step Node Icon Badge */}
            <div className="mb-6 md:mb-12 self-start md:ml-[35%] transition-transform duration-300 hover:scale-110">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-[0_0_25px_rgba(56,189,248,0.3)] flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-300">
                <Package className="w-6 h-6 text-sky-600 stroke-[2.2]" />
              </div>
            </div>

            {/* Content Box with Watermark Number */}
            <div className="relative pt-2 max-w-xs">
              <div className="absolute -top-10 left-0 text-7xl sm:text-8xl font-bold text-white/[0.07] pointer-events-none leading-none select-none font-sans">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight relative z-10">
                Design process
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed relative z-10 font-normal">
                Far far away, behind mountains, far from the countries Vokalia.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER BAR */}
      <div className="w-full max-w-7xl mx-auto pt-8 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-slate-500 relative z-10">
        <div className="font-medium tracking-wider">
          2022 essentials.
        </div>
        <a
          href="#website"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          <span>www.website.com</span>
        </a>
      </div>

    </section>
  );
}
