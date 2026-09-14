function Comparison({ data }) {
  const alternatives = data?.alternatives || []
  const recommendation = data?.recommendation || null

  /*
   * Combine the recommended mandi with all alternatives.
   *
   * Backend structure:
   *
   * recommendation → best mandi
   * alternatives   → remaining mandis
   *
   * The comparison section should display ALL available mandis.
   */
  const allMarkets = [
    ...(recommendation ? [recommendation] : []),
    ...alternatives,
  ]

  /*
   * Build comparison rows from backend data.
   *
   * Nothing below is hardcoded market data.
   */
  const markets = allMarkets.map((market) => ({
    market: market.market,
    price: Number(market.price_per_quintal || 0),
    distance: Number(market.distance_km || 0),
    transport: Number(market.transport_cost || 0),
    net: Number(market.net_revenue || 0),

    recommended:
      recommendation?.market === market.market,
  }))

  /*
   * Sort all available mandis by net realization.
   *
   * This means the table ranking is based on the actual
   * economic outcome rather than market price alone.
   */
  const sortedMarkets = [...markets].sort(
    (a, b) => b.net - a.net
  )

  /*
   * Add dynamic ranking after sorting.
   */
  const rankedMarkets = sortedMarkets.map((market, index) => ({
    ...market,
    rank: String(index + 1).padStart(2, "0"),
  }))

  /*
   * The first mandi is the highest-net-realization mandi.
   * The second mandi is the next-best available option.
   */
  const bestMarket = rankedMarkets[0]
  const secondBestMarket = rankedMarkets[1]

  /*
   * Calculate the advantage of the best mandi over
   * the second-best available mandi.
   */
  const decisionAdvantage =
    bestMarket && secondBestMarket
      ? Math.max(0, bestMarket.net - secondBestMarket.net)
      : 0

  return (
    <section
      id="comparison"
      className="relative overflow-hidden bg-[#080a09] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute right-[-250px] top-[15%] h-[600px] w-[600px] rounded-full bg-lime-400/[0.025] blur-[160px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-16 max-w-4xl">

          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-lime-400/60" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              MARKET COMPARISON
            </span>
          </div>

          <h2 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            THE HIGHEST
            <br />
            PRICE ISN'T ALWAYS
            <br />
            THE BEST PRICE.
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            A mandi can offer a better selling price and still leave you with
            less money after transport. KisanMandi compares the complete
            economics before making a recommendation.
          </p>

        </div>

        {/* Comparison table */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">

          {/* Table header */}
          <div className="hidden grid-cols-[70px_1.7fr_1fr_1fr_1fr_1.2fr] border-b border-white/[0.08] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white/25 md:grid lg:px-8">

            <span>#</span>
            <span>Market</span>
            <span>Price / Q</span>
            <span>Distance</span>
            <span>Transport</span>

            <span className="text-right">
              Net Realization
            </span>

          </div>

          {/* Rows */}
          <div>
            {rankedMarkets.length > 0 ? (
              rankedMarkets.map((market) => (
                <MarketRow
                  key={market.market}
                  market={market}
                />
              ))
            ) : (
              <div className="px-6 py-16 text-center">
                <p className="text-sm text-white/30">
                  Run the calculator to compare available mandis.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Insight */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">

          {/* Main insight */}
          <div className="rounded-2xl border border-lime-400/15 bg-lime-400/[0.025] p-7 sm:p-9">

            <div className="flex items-start justify-between gap-5">

              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-lime-400/60">
                  KISANMANDI INSIGHT
                </span>

                <h3 className="mt-5 max-w-xl text-2xl font-medium uppercase leading-tight tracking-[-0.03em] text-white/90 sm:text-3xl">
                  NET REALIZATION
                  <br />
                  IS THE REAL NUMBER.
                </h3>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lime-400/20 bg-lime-400/[0.05] sm:flex">
                <span className="text-lg text-lime-400">
                  ↗
                </span>
              </div>

            </div>

            <p className="mt-6 max-w-xl text-sm leading-6 text-white/40">
              Instead of ranking mandis by price alone, KisanMandi factors in
              distance and estimated transport cost to determine what the
              farmer is actually left with.
            </p>

          </div>

          {/* Difference card */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9">

            <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
              DECISION ADVANTAGE
            </span>

            <div className="mt-7 flex items-end gap-4">

              <span className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                {decisionAdvantage > 0
                  ? `₹${decisionAdvantage.toLocaleString("en-IN")}`
                  : "—"}
              </span>

              {decisionAdvantage > 0 && (
                <span className="mb-2 text-[9px] uppercase tracking-[0.18em] text-lime-400/60">
                  MORE NET
                </span>
              )}

            </div>

            <p className="mt-4 text-sm leading-6 text-white/35">
              Estimated additional realization from choosing the recommended
              mandi over the second-best available option.
            </p>

          </div>

        </div>

        {/* Bottom statement */}
        <div className="mt-20 flex flex-col justify-between gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">

          <p className="max-w-xl text-xs leading-6 text-white/25">
            Every recommendation considers price, quantity, distance and
            transport economics together.
          </p>

          <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">
            DECISION ENGINE / 01
          </span>

        </div>

      </div>
    </section>
  )
}


function MarketRow({ market }) {
  return (
    <div
      className={`grid gap-5 border-b border-white/[0.07] px-6 py-7 transition-colors duration-300 last:border-b-0 md:grid-cols-[70px_1.7fr_1fr_1fr_1fr_1.2fr] md:items-center lg:px-8 ${
        market.recommended
          ? "bg-lime-400/[0.035] hover:bg-lime-400/[0.055]"
          : "hover:bg-white/[0.025]"
      }`}
    >

      {/* Rank */}
      <span className="text-[10px] font-medium tracking-[0.15em] text-white/20">
        {market.rank}
      </span>


      {/* Market */}
      <div>

        <div className="flex flex-wrap items-center gap-3">

          <span className="text-sm font-medium text-white/75">
            {market.market}
          </span>

          {market.recommended && (
            <span className="rounded-full border border-lime-400/20 bg-lime-400/[0.06] px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-lime-400/80">
              Recommended
            </span>
          )}

        </div>

        {/* Mobile labels */}
        <span className="mt-2 block text-[9px] uppercase tracking-[0.15em] text-white/20 md:hidden">
          Mandi
        </span>

      </div>


      {/* Price */}
      <DataCell
        label="Price / Quintal"
        value={`₹${market.price.toLocaleString("en-IN")}`}
      />


      {/* Distance */}
      <DataCell
        label="Distance"
        value={`${market.distance.toFixed(2)} km`}
      />


      {/* Transport */}
      <DataCell
        label="Transport"
        value={`₹${market.transport.toLocaleString("en-IN")}`}
      />


      {/* Net */}
      <div className="flex flex-col md:items-end">

        <span className="text-[9px] uppercase tracking-[0.15em] text-white/20 md:hidden">
          Net Realization
        </span>

        <span
          className={`mt-1 text-lg font-medium tracking-[-0.02em] ${
            market.recommended
              ? "text-lime-400"
              : "text-white/55"
          }`}
        >
          ₹{market.net.toLocaleString("en-IN")}
        </span>

      </div>

    </div>
  )
}


function DataCell({ label, value }) {
  return (
    <div>

      <span className="block text-[9px] uppercase tracking-[0.15em] text-white/20 md:hidden">
        {label}
      </span>

      <span className="mt-1 block text-sm text-white/50 md:mt-0">
        {value}
      </span>

    </div>
  )
}


export default Comparison