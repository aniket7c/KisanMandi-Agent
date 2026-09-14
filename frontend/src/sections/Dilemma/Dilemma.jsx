function Dilemma({ data = {} }) {
  const recommendation = data?.recommendation ?? null
  const alternatives = data?.alternatives ?? []

  /*
   * Build the complete market list from the backend response.
   *
   * Backend structure:
   *
   * recommendation
   * alternatives[]
   *
   * The recommendation is already the best mandi according
   * to net realization.
   */
  const markets = [
    ...(recommendation ? [recommendation] : []),
    ...alternatives,
  ]

  const hasData = markets.length > 0
  const hasSingleMarket = markets.length === 1
  const hasComparison = markets.length >= 2

  /*
   * For the two-sided dilemma, always compare:
   *
   * Recommended mandi
   *        VS
   * Best available alternative
   *
   * The backend already ranks alternatives by net realization.
   */
  const recommendedMarket = recommendation ?? markets[0]
  const alternativeMarket =
    alternatives[0] ??
    markets.find(
      (market) => market.market !== recommendedMarket?.market
    )

  const formatCurrency = (value) => {
    if (value === undefined || value === null || value === "") {
      return "—"
    }

    return `₹${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`
  }

  const getPrice = (market) =>
    market?.price_per_quintal ?? market?.price ?? null

  const getDistance = (market) =>
    market?.distance_km ?? market?.distance ?? null

  const getTransport = (market) =>
    market?.transport_cost ?? market?.transport ?? null

  const getNet = (market) =>
    market?.net_revenue ?? market?.net ?? null

  const calculateDifference = (recommended, alternative) => {
    const recommendedNet = Number(getNet(recommended))
    const alternativeNet = Number(getNet(alternative))

    if (
      !Number.isFinite(recommendedNet) ||
      !Number.isFinite(alternativeNet)
    ) {
      return null
    }

    return recommendedNet - alternativeNet
  }

  const decisionDifference = hasComparison
    ? calculateDifference(
        recommendedMarket,
        alternativeMarket
      )
    : null

  return (
    <section
      id="dilemma"
      className="relative overflow-hidden bg-[#101312] px-6 py-28 text-[#f1f0e8] md:px-12 lg:px-16"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#9bea00]/[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section label */}
        <div className="mb-20 flex items-center gap-4">
          <span className="h-px w-10 bg-[#9bea00]" />

          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#9bea00]">
            02 / The Cost Trap
          </span>
        </div>

        {/* Heading + explanation */}
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">

          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-white/35">
              THE DILEMMA
            </p>

            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.045em] md:text-7xl lg:text-[88px]">
              THE HIGHEST
              <br />
              PRICE ISN'T
              <br />
              ALWAYS THE
              <br />
              <span className="text-[#9bea00]">
                BEST DEAL.
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="text-lg leading-relaxed text-white/60 md:text-xl">
              Farmers often choose the mandi offering the highest price.
              But distance, transportation and handling costs can quietly
              erase that advantage.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-white/40">
              What matters isn't the mandi price.
              <br />
              It's what you actually take home.
            </p>
          </div>

        </div>

        {/* ========================================================= */}
        {/* NO MARKET DATA */}
        {/* ========================================================= */}

        {!hasData && (
          <div className="mt-24 rounded-2xl border border-white/10 bg-[#151817] p-10 md:p-14 lg:p-16">
            <div className="flex flex-col items-center justify-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.025]">
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-white/30">
                MARKET DATA
              </p>

              <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-white">
                No matching mandi data available.
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/35">
                Run the calculator with a different crop, district or
                variety to find available market options.
              </p>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SINGLE MARKET */}
        {/* ========================================================= */}

        {hasSingleMarket && recommendedMarket && (
          <div className="mt-24 overflow-hidden rounded-2xl border border-white/10 bg-[#172016]">

            <div className="p-8 md:p-10 lg:p-12">

              {/* Header */}
              <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#9bea00]/60">
                    ONLY MARKET AVAILABLE
                  </p>

                  <h3 className="mt-3 text-2xl font-medium text-white md:text-3xl">
                    {recommendedMarket.market || "Available Mandi"}
                  </h3>
                </div>

                <span className="w-fit rounded-full bg-[#9bea00] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-black">
                  Best Available
                </span>

              </div>

              {/* Metrics */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                    Market Price
                  </p>

                  <p className="text-3xl font-medium">
                    {formatCurrency(getPrice(recommendedMarket))}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    per quintal
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                    Distance
                  </p>

                  <p className="text-3xl font-medium">
                    {getDistance(recommendedMarket) !== null
                      ? `${Number(
                          getDistance(recommendedMarket)
                        ).toFixed(2)} km`
                      : "—"}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    estimated road distance
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                    Transport
                  </p>

                  <p className="text-3xl font-medium text-white/70">
                    {formatCurrency(getTransport(recommendedMarket))}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    estimated cost
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#9bea00]/60">
                    Net Realization
                  </p>

                  <p className="text-3xl font-semibold text-[#9bea00]">
                    {formatCurrency(getNet(recommendedMarket))}
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    estimated amount after transport
                  </p>
                </div>

              </div>

              {/* Explanation */}
              <div className="mt-12 border-t border-white/10 pt-8">

                <p className="text-sm leading-6 text-white/40">
                  This is the only matching mandi currently available
                  in the market feed for the selected crop and location.
                  KisanMandi recommends it because there is no alternative
                  market to compare against right now.
                </p>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TWO OR MORE MARKETS */}
        {/* ========================================================= */}

        {hasComparison &&
          recommendedMarket &&
          alternativeMarket && (
            <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">

              {/* ===================================================== */}
              {/* ALTERNATIVE */}
              {/* ===================================================== */}

              <div className="bg-[#151817] p-8 md:p-10 lg:p-12">

                <div className="mb-12 flex items-center justify-between">

                  <div>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      {alternativeMarket.market || "Alternative Mandi"}
                    </span>

                    <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-white/20">
                      ALTERNATIVE
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-white/40">
                    {getDistance(alternativeMarket) !== null
                      ? `${Number(
                          getDistance(alternativeMarket)
                        ).toFixed(2)} km`
                      : "Distance unavailable"}
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-8">

                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Market Price
                    </p>

                    <p className="text-3xl font-medium">
                      {formatCurrency(
                        getPrice(alternativeMarket)
                      )}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      per quintal
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Transport
                    </p>

                    <p className="text-3xl font-medium text-white/70">
                      {formatCurrency(
                        getTransport(alternativeMarket)
                      )}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      estimated cost
                    </p>
                  </div>

                </div>

                <div className="mt-12 border-t border-white/10 pt-8">

                  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                    Net Realization
                  </p>

                  <p className="text-5xl font-semibold tracking-tight">
                    {formatCurrency(
                      getNet(alternativeMarket)
                    )}
                  </p>

                </div>

              </div>

              {/* ===================================================== */}
              {/* RECOMMENDED */}
              {/* ===================================================== */}

              <div className="relative bg-[#172016] p-8 md:p-10 lg:p-12">

                <div className="absolute right-8 top-8 rounded-full bg-[#9bea00] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-black">
                  Better Choice
                </div>

                <div className="mb-12">

                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    {recommendedMarket.market || "Recommended Mandi"}
                  </span>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#9bea00]/60">
                    RECOMMENDED
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-8">

                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Market Price
                    </p>

                    <p className="text-3xl font-medium">
                      {formatCurrency(
                        getPrice(recommendedMarket)
                      )}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      per quintal
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                      Transport
                    </p>

                    <p className="text-3xl font-medium text-white/70">
                      {formatCurrency(
                        getTransport(recommendedMarket)
                      )}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      estimated cost
                    </p>
                  </div>

                </div>

                <div className="mt-12 border-t border-white/10 pt-8">

                  <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
                    Net Realization
                  </p>

                  <div className="flex flex-wrap items-end gap-4">

                    <p className="text-5xl font-semibold tracking-tight text-[#9bea00]">
                      {formatCurrency(
                        getNet(recommendedMarket)
                      )}
                    </p>

                    {decisionDifference !== null && (
                      <span className="mb-2 text-xs text-[#9bea00]/70">
                        {decisionDifference >= 0
                          ? `+${formatCurrency(
                              decisionDifference
                            )} more`
                          : formatCurrency(
                              decisionDifference
                            )}
                      </span>
                    )}

                  </div>

                </div>

              </div>

            </div>
          )}

        {/* Bottom statement */}
        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">

          <p className="max-w-xl text-sm leading-relaxed text-white/35">
            KisanMandi doesn't simply find the highest price.
            It calculates the highest
            <span className="text-white/70">
              {" "}net realization.
            </span>
          </p>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/30">

            <span className="h-2 w-2 rounded-full bg-[#9bea00]" />

            Price − Logistics = Realization

          </div>

        </div>

      </div>
    </section>
  )
}

export default Dilemma