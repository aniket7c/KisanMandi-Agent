function Intelligence({ data = null }) {
  const recommendation = data?.recommendation
  const alternatives = data?.alternatives || []

  const hasData = Boolean(recommendation)

  const marketsAnalyzed = hasData
    ? alternatives.length + 1
    : 0

  const factors = hasData
    ? [
        {
          id: "market",
          label: "Recommended Mandi",
          value: recommendation.market || "—",
        },
        {
          id: "variety",
          label: "Variety",
          value: recommendation.variety || "—",
        },
        {
          id: "quantity",
          label: "Quantity",
          value: recommendation.quantity_quintals
            ? `${recommendation.quantity_quintals} quintals`
            : "—",
        },
        {
          id: "price",
          label: "Market Price",
          value:
            recommendation.price_per_quintal != null
              ? `₹${Number(
                  recommendation.price_per_quintal
                ).toLocaleString("en-IN")}`
              : "—",
        },
        {
          id: "distance",
          label: "Distance",
          value:
            recommendation.distance_km != null
              ? `${recommendation.distance_km} km`
              : "—",
        },
        {
          id: "transport",
          label: "Transport Cost",
          value:
            recommendation.transport_cost != null
              ? `₹${Number(
                  recommendation.transport_cost
                ).toLocaleString("en-IN")}`
              : "—",
        },
      ]
    : []

  const status = hasData
    ? `${marketsAnalyzed} MARKETS ANALYZED`
    : "WAITING FOR MARKET DATA"

  return (
    <section
      id="intelligence"
      className="relative overflow-hidden border-t border-white/10 bg-[#071a12] px-6 py-24 sm:px-10 lg:px-16"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 max-w-4xl">

          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-lime-400" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-lime-400">
              THE INTELLIGENCE ENGINE
            </span>
          </div>

          <h2 className="max-w-4xl text-4xl font-bold uppercase leading-[0.95] tracking-[-0.04em] text-[#f3f1e8] sm:text-5xl lg:text-7xl">
            THE RIGHT MANDI ISN'T ALWAYS THE CLOSEST.
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            KisanMandi combines live mandi prices, distance,
            transportation costs, and market conditions to calculate
            where your crop can generate the highest net realization.
          </p>

        </div>

        {/* Intelligence panel */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="bg-[#091f16] p-8 sm:p-10 lg:p-12">

            <div className="mb-10 flex items-center justify-between">

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Decision Inputs
              </span>

              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-lime-400">

                <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)]" />

                {status}

              </span>

            </div>

            <div className="space-y-3">

              {hasData ? (

                factors.map((factor) => (
                  <div
                    key={factor.id}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:border-lime-400/30 hover:bg-white/[0.05]"
                  >

                    <div>

                      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                        {factor.label}
                      </p>

                      <p className="mt-2 text-lg font-medium text-white">
                        {factor.value}
                      </p>

                    </div>

                    <span className="text-white/20 transition-colors group-hover:text-lime-400">
                      →
                    </span>

                  </div>
                ))

              ) : (

                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">

                  <p className="text-sm text-white/35">
                    Run the calculator to load live market inputs...
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex min-h-[420px] flex-col justify-between bg-[#0b2419] p-8 sm:p-10 lg:p-12">

            {/* Glow */}
            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-lime-400/10 blur-[100px]" />

            <div className="relative">

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
                How the agent thinks
              </span>

              <div className="mt-10 space-y-8">

                {/* COLLECT */}
                <div className="flex gap-5">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-lime-400/30 text-xs text-lime-400">
                    01
                  </span>

                  <div>

                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      Collect
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {hasData
                        ? `Collected live pricing and location data from ${marketsAnalyzed} available mandis.`
                        : "Gather current market prices and location-specific data."}
                    </p>

                  </div>

                </div>

                <div className="h-px bg-white/10" />

                {/* CALCULATE */}
                <div className="flex gap-5">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-lime-400/30 text-xs text-lime-400">
                    02
                  </span>

                  <div>

                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      Calculate
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {hasData
                        ? "Compared market prices, distance and estimated transport costs to calculate net realization."
                        : "Compare expected revenue against transport and handling costs."}
                    </p>

                  </div>

                </div>

                <div className="h-px bg-white/10" />

                {/* RECOMMEND */}
                <div className="flex gap-5">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-lime-400/30 text-xs text-lime-400">
                    03
                  </span>

                  <div>

                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                      Recommend
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {hasData
                        ? `Recommended ${recommendation.market} based on the highest expected net realization.`
                        : "Rank mandis by the farmer's expected net realization."}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Bottom status */}
            <div className="relative mt-12 border-t border-white/10 pt-6">

              <div className="flex items-center justify-between">

                <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                  KISANMANDI INTELLIGENCE
                </p>

                {hasData && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-lime-400">
                    ENGINE ACTIVE
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Intelligence