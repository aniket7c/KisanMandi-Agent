function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#0b2419] text-white"
    >

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[18%] top-[18%] h-[500px] w-[500px] rounded-full bg-emerald-400/[0.08] blur-[140px]" />

        <div className="absolute right-[10%] top-[30%] h-[400px] w-[400px] rounded-full bg-lime-400/[0.05] blur-[130px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Hero content */}
      <div className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-6 pb-20 pt-32 md:px-12 lg:px-14">

        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-9 bg-lime-400" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-lime-400/80 md:text-[11px]">
            LIVE AGMARKNET DATA
          </span>

          <span className="text-[10px] text-lime-400/60">•</span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-lime-400/80 md:text-[11px]">
            SPATIAL LOGISTICS
          </span>

          <span className="hidden text-[10px] text-lime-400/60 sm:block">
            •
          </span>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-lime-400/80 sm:block md:text-[11px]">
            MAXIMIZED PROFIT
          </span>
        </div>

        {/* Main heading */}
        <h1 className="max-w-[900px] text-[64px] font-black uppercase leading-[0.88] tracking-[-0.055em] text-[#f4f1e9] sm:text-[82px] md:text-[105px] lg:text-[116px]">

          SELL SMARTER.

          <br />

          <span>
            EARN{" "}
            <span className="bg-gradient-to-r from-[#f4f1e9] via-[#c4d99c] to-lime-400 bg-clip-text text-transparent">
              MORE
            </span>
            <span className="text-lime-400">.</span>
          </span>

        </h1>

        {/* Description */}
        <p className="mt-10 max-w-[620px] text-[17px] leading-[1.45] text-white/60 md:text-[20px]">
          AI-powered mandi recommendations using real-time
          <br className="hidden md:block" />
          market prices, geographic distance, and verified
          <br className="hidden md:block" />
          transportation cost models.
        </p>

        {/* Actions + Stats */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <a
              href="#calculator"
              className="group inline-flex h-12 items-center justify-center rounded-full bg-lime-400 px-7 text-[10px] font-bold tracking-[0.2em] text-black transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_35px_rgba(163,230,53,0.25)]"
            >
              FIND MY BEST MANDI

              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#intelligence"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 text-[10px] font-bold tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              HOW IT WORKS

              <span className="ml-3 text-lime-400">
                ↓
              </span>
            </a>

          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">

            <div className="h-10 w-px bg-white/10" />

            <div>
              <div className="text-[16px] font-bold text-white">
                2,700+
              </div>

              <div className="mt-1 text-[10px] text-white/40">
                Indian Mandis Monitored
              </div>
            </div>

            <div>
              <div className="text-[16px] font-bold text-lime-400">
                ₹14,200
                <span className="text-white/40"> avg</span>
              </div>

              <div className="mt-1 text-[10px] text-white/40">
                Farmer Revenue Delta / Load
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 flex items-center gap-4 md:left-12 lg:left-14">

          <div className="relative flex h-8 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5">
            <div className="h-2 w-1 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.7)]" />
          </div>

          <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/30">
            SCROLL TO EXPLORE THE ALGORITHM
          </span>

        </div>

      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />

    </section>
  )
}

export default Hero