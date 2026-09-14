function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-[#080a09] px-6 py-32 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/[0.035] blur-[150px]" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">

        {/* Label */}
        <div className="mb-8 flex items-center justify-center gap-3">

          <span className="h-px w-10 bg-lime-400/50" />

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
            MAKE THE BETTER DECISION
          </span>

          <span className="h-px w-10 bg-lime-400/50" />

        </div>

        {/* Main heading */}
        <h2 className="mx-auto max-w-5xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.055em] sm:text-6xl lg:text-8xl">

          YOUR CROP.
          <br />

          <span className="text-white/30">
            YOUR MARKET.
          </span>

          <br />

          <span className="text-lime-400">
            YOUR DECISION.
          </span>

        </h2>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/35 sm:text-base">
          Stop guessing where to sell. Let KisanMandi compare the markets,
          calculate the real economics and help you find where your crop is
          worth the most.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <a
            href="#calculator"
            className="group inline-flex items-center gap-4 rounded-full bg-lime-400 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_40px_rgba(163,230,53,0.15)]"
          >
            FIND YOUR BEST MANDI

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href="#hero"
            className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.025] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
          >
            BACK TO TOP
            <span>↑</span>
          </a>

        </div>

        {/* Bottom stats */}
        <div className="mx-auto mt-24 grid max-w-3xl grid-cols-1 border-y border-white/[0.08] sm:grid-cols-3">

          <Stat
            value="3 SEC"
            label="Decision time"
          />

          <Stat
            value="REAL"
            label="Market economics"
            bordered
          />

          <Stat
            value="1 GOAL"
            label="Better realization"
            bordered
          />

        </div>

        {/* Closing statement */}
        <div className="mt-16">

          <p className="text-[9px] uppercase tracking-[0.3em] text-white/15">
            KISANMANDI INTELLIGENCE
          </p>

          <p className="mt-3 text-xs text-white/20">
            Data into decisions. Decisions into better outcomes.
          </p>

        </div>

      </div>
    </section>
  )
}

function Stat({ value, label, bordered = false }) {
  return (
    <div
      className={`px-6 py-7 ${
        bordered
          ? "border-t border-white/[0.08] sm:border-l sm:border-t-0"
          : ""
      }`}
    >
      <span className="block text-xl font-medium tracking-[-0.02em] text-white/70">
        {value}
      </span>

      <span className="mt-2 block text-[8px] uppercase tracking-[0.2em] text-white/20">
        {label}
      </span>
    </div>
  )
}

export default FinalCTA