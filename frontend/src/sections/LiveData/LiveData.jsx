function LiveData({ markets = [] }) {
  const hasData = markets.length > 0
  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") {
      return "—"
    }
    return `₹${Number(value).toLocaleString("en-IN")}`
  }
  return (
    <section
      id="live-data"
      className="relative overflow-hidden bg-[#070b09] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute right-[-180px] top-20 h-[500px] w-[500px] rounded-full bg-lime-400/[0.035] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-lime-400/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              LIVE MANDI DATA
            </span>
          </div>
          <h2 className="text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
            SEE THE
            <br />
            <span className="text-white/30">MARKET.</span>
            <br />
            <span className="text-lime-400">AS IT MOVES.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Monitor current mandi prices and market conditions before
            deciding where to sell. KisanMandi turns market data into
            a clearer selling decision.
          </p>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-5 border-y border-white/[0.08] py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span
              className={`h-2 w-2 rounded-full ${
                hasData
                  ? "bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)]"
                  : "bg-white/20"
              }`}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/50">
              {hasData ? "LIVE FEED CONNECTED" : "LIVE FEED READY"}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
            DATA SOURCE · MANDI MARKET FEED
          </span>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <div className="hidden grid-cols-[1.8fr_1fr_1fr_1fr_1fr] border-b border-white/[0.08] px-6 py-5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/25 md:grid lg:px-8">
            <span>Market</span>
            <span>Commodity</span>
            <span>Variety</span>
            <span>Modal Price</span>
            <span className="text-right">Status</span>
          </div>
          {!hasData && (
            <div className="px-6 py-20 text-center sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                <span className="h-2.5 w-2.5 rounded-full bg-lime-400/70" />
              </div>
              <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] text-white">
                Waiting for market data.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/30">
                The live market feed will appear here once the
                KisanMandi data endpoint is connected.
              </p>
            </div>
          )}
          {hasData && (
            <div>
              {markets.map((market, index) => (
                <div
                  key={`${market.market}-${index}`}
                  className="group border-b border-white/[0.07] px-6 py-6 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.025] lg:px-8"
                >
                  <div className="hidden grid-cols-[1.8fr_1fr_1fr_1fr_1fr] items-center md:grid">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {market.market || "Unknown market"}
                      </h3>
                      {market.distance_km !== undefined && (
                        <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/25">
                          {market.distance_km} km
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-white/50">
                      {market.commodity || "—"}
                    </span>
                    <span className="text-xs text-white/50">
                      {market.variety || "—"}
                    </span>
                    <span className="text-sm font-medium text-white/80">
                      {formatPrice(
                        market.modal_price ??
                        market.price_per_quintal
                      )}
                    </span>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/15 bg-lime-400/[0.04] px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-lime-400/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                        Live
                      </span>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                          MARKET
                        </p>
                        <h3 className="mt-2 text-base font-medium text-white">
                          {market.market || "Unknown market"}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/15 bg-lime-400/[0.04] px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-lime-400/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                        Live
                      </span>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.17em] text-white/20">
                          Commodity
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                          {market.commodity || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.17em] text-white/20">
                          Variety
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                          {market.variety || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.17em] text-white/20">
                          Modal Price
                        </p>
                        <p className="mt-2 text-sm font-medium text-lime-400">
                          {formatPrice(
                            market.modal_price ??
                            market.price_per_quintal
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.17em] text-white/20">
                          Distance
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                          {market.distance_km !== undefined
                            ? `${market.distance_km} km`
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
          <LiveMetric
            label="MARKET PRICES"
            value={hasData ? `${markets.length}` : "—"}
            description="Markets currently available"
          />
          <LiveMetric
            label="DATA FLOW"
            value={hasData ? "LIVE" : "READY"}
            description="Current market feed status"
          />
          <LiveMetric
            label="DECISION ENGINE"
            value="ACTIVE"
            description="Built for smarter selling decisions"
          />

        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
            Market information may change as new mandi data arrives.
          </p>
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/15">
            KISANMANDI INTELLIGENCE
          </span>
        </div>
      </div>
    </section>
  )
}
function LiveMetric({ label, value, description }) {
  return (
    <div className="bg-[#0b0f0c] p-6 sm:p-7">
      <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
        {label}
      </p>
      <p className="mt-4 text-2xl font-medium tracking-[-0.03em] text-lime-400">
        {value}
      </p>
      <p className="mt-2 text-xs text-white/25">
        {description}
      </p>
    </div>
  )
}
export default LiveData