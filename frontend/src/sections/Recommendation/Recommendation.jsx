import { useState } from "react"

function Recommendation({ data }) {
  const [selectedMarket, setSelectedMarket] = useState(0)

  // No backend result yet
  if (!data || !data.recommendation) {
    return (
      <section
        id="recommendation"
        className="relative overflow-hidden bg-[#080a09] px-6 py-28 text-white sm:px-10 lg:px-16"
      >
        <div className="pointer-events-none absolute right-[-150px] top-[20%] h-[500px] w-[500px] rounded-full bg-lime-400/[0.025] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-16 max-w-4xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-lime-400/60" />

              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                MANDI RECOMMENDATION
              </span>
            </div>

            <h2 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              YOUR BEST
              <br />
              MARKET IS HERE.
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
              Find your best mandi using real-time market prices,
              transportation costs and expected net realization.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-white/20" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                WAITING FOR CALCULATION
              </span>
            </div>

            <p className="mt-6 max-w-xl text-lg leading-7 text-white/30">
              Enter your crop details in the calculator above and find out
              which mandi gives you the strongest net realization.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const recommendation = data.recommendation

  const alternatives = data.alternatives || []

  /*
   * Put the recommended market first.
   * This allows the user to select the recommendation
   * or any alternative market.
   */
  const markets = [
    recommendation,
    ...alternatives.filter(
      (market) => market.market !== recommendation.market
    ),
  ]

  const selected = markets[selectedMarket] || recommendation

  const formatCurrency = (value) => {
    if (value === undefined || value === null) {
      return "—"
    }

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section
      id="recommendation"
      className="relative overflow-hidden bg-[#080a09] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute right-[-150px] top-[20%] h-[500px] w-[500px] rounded-full bg-lime-400/[0.025] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 max-w-4xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-lime-400/60" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              MANDI RECOMMENDATION
            </span>
          </div>

          <h2 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            YOUR BEST
            <br />
            MARKET IS HERE.
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            We compare market prices, estimated transport costs and expected
            realization to identify the option that makes the most financial
            sense.
          </p>
        </div>

        {/* Main recommendation card */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">

          {/* Top bar */}
          <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] px-7 py-5 sm:flex-row sm:items-center sm:px-10">

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.5)]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                RECOMMENDED MARKET
              </span>
            </div>

            <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
              BASED ON CURRENT INPUT
            </span>
          </div>

          {/* Recommendation */}
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">

            {/* Main result */}
            <div className="border-b border-white/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">

              <div className="mb-12">

                <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                  MARKET
                </span>

                <h3 className="mt-3 text-3xl font-medium tracking-[-0.035em] text-white sm:text-4xl">
                  {selected.market}
                </h3>

                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/30">
                  {selected.variety || "—"} variety
                </p>

              </div>

              {/* Net revenue */}
              <div>

                <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                  EXPECTED NET REALIZATION
                </span>

                <div className="mt-3 flex items-baseline gap-3">

                  <span className="text-5xl font-semibold tracking-[-0.045em] text-lime-400 sm:text-6xl">
                    ₹
                    {formatCurrency(
                      selected.net_revenue
                    )}
                  </span>

                  <span className="text-xs uppercase tracking-[0.15em] text-white/25">
                    estimated
                  </span>

                </div>

              </div>

              {/* Metrics */}
              <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">

                <Metric
                  label="Market Price"
                  value={`₹${formatCurrency(
                    selected.price_per_quintal
                  )}`}
                />

                <Metric
                  label="Distance"
                  value={
                    selected.distance_km !== undefined
                      ? `${selected.distance_km} km`
                      : "—"
                  }
                />

                <Metric
                  label="Transport"
                  value={`₹${formatCurrency(
                    selected.transport_cost
                  )}`}
                />

                <Metric
                  label="Gross Revenue"
                  value={`₹${formatCurrency(
                    selected.gross_revenue
                  )}`}
                />

              </div>

            </div>

            {/* Decision panel */}
            <div className="flex flex-col justify-between bg-lime-400 p-7 text-[#07100a] sm:p-10 lg:p-12">

              <div>

                <span className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-50">
                  WHY THIS MARKET
                </span>

                <p className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
                  Higher expected realization after transport costs.
                </p>

              </div>

              <div className="mt-12 border-t border-black/10 pt-6">

                <div className="flex items-end justify-between">

                  <div>

                    <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] opacity-45">
                      YOUR ADVANTAGE
                    </span>

                    <span className="mt-2 block text-3xl font-semibold tracking-[-0.04em]">
                      ₹
                      {formatCurrency(
                        selected.net_revenue
                      )}
                    </span>

                  </div>

                  <span className="text-3xl">
                    ↗
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Alternatives */}
        <div className="mt-10">

          <div className="mb-6 flex items-center justify-between">

            <span className="text-[10px] uppercase tracking-[0.28em] text-white/30">
              OTHER OPTIONS
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              {markets.length} MARKETS
            </span>

          </div>

          <div className="grid gap-3">

            {markets.map((market, index) => {

              const isSelected = index === selectedMarket

              return (
                <button
                  key={`${market.market}-${index}`}
                  type="button"
                  onClick={() => setSelectedMarket(index)}
                  className={`group flex w-full flex-col gap-5 rounded-xl border p-5 text-left transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
                    isSelected
                      ? "border-lime-400/30 bg-lime-400/[0.045]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                  }`}
                >

                  <div className="flex items-center gap-5">

                    <span
                      className={`text-[10px] tracking-[0.15em] ${
                        isSelected
                          ? "text-lime-400"
                          : "text-white/20"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <div>

                      <h4 className="text-sm font-medium text-white">
                        {market.market}
                      </h4>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/25">
                        {market.distance_km !== undefined
                          ? `${market.distance_km} km`
                          : "Distance unavailable"}
                        {" · "}
                        {market.variety || "—"}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center justify-between gap-8 sm:justify-end">

                    <div className="text-left sm:text-right">

                      <span className="block text-[9px] uppercase tracking-[0.18em] text-white/20">
                        NET
                      </span>

                      <span
                        className={`mt-1 block text-lg font-medium tracking-[-0.02em] ${
                          isSelected
                            ? "text-lime-400"
                            : "text-white/70"
                        }`}
                      >
                        ₹
                        {formatCurrency(
                          market.net_revenue
                        )}
                      </span>

                    </div>

                    <span
                      className={`text-lg transition-transform duration-300 ${
                        isSelected
                          ? "translate-x-1 text-lime-400"
                          : "text-white/20 group-hover:translate-x-1 group-hover:text-white/50"
                      }`}
                    >
                      →
                    </span>

                  </div>

                </button>
              )
            })}

          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            Estimates are based on available market and transport data.
          </p>

          <span className="text-[9px] uppercase tracking-[0.18em] text-white/15">
            KISANMANDI INTELLIGENCE
          </span>

        </div>

      </div>
    </section>
  )
}

function Metric({ label, value }) {
  return (
    <div className="bg-[#0c0f0d] p-4 sm:p-5">

      <span className="block text-[9px] uppercase tracking-[0.17em] text-white/25">
        {label}
      </span>

      <span className="mt-2 block text-sm font-medium text-white/75">
        {value}
      </span>

    </div>
  )
}

export default Recommendation