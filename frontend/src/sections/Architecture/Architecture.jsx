function Architecture({ data }) {
  // App.jsx initially sends null.
  // Convert null/undefined into a safe object.
  const safeData = data ?? {}

  // Backend structure:
  //
  // {
  //   status: "success",
  //   recommendation: {...},
  //   alternatives: [...]
  // }

  const recommendation = safeData.recommendation ?? null

  const alternatives = Array.isArray(safeData.alternatives)
    ? safeData.alternatives
    : []

  const hasResult = Boolean(recommendation)

  /*
   * ----------------------------------------------------
   * FARMER INPUT
   * ----------------------------------------------------
   *
   * The current backend response does NOT return crop,
   * district or state.
   *
   * It DOES return:
   * - variety
   * - quantity_quintals
   *
   * Therefore we only display information that actually
   * exists in the recommendation response.
   */

  const crop = safeData.crop ?? "—"
  const district = safeData.district ?? "—"

  const quantity =
    recommendation?.quantity_quintals !== undefined
      ? `${recommendation.quantity_quintals} quintal`
      : "—"

  const variety = recommendation?.variety ?? "—"

  /*
   * ----------------------------------------------------
   * MARKET INTELLIGENCE
   * ----------------------------------------------------
   */

  const mandiPrices =
    alternatives.length > 0
      ? `${alternatives.length} markets`
      : "—"

  const marketData =
    hasResult
      ? "AVAILABLE"
      : "WAITING"

  const distance =
    recommendation?.distance_km !== undefined
      ? `${recommendation.distance_km} km`
      : "—"

  const transport =
    recommendation?.transport_cost !== undefined
      ? `₹${formatCurrency(recommendation.transport_cost)}`
      : "—"

  /*
   * ----------------------------------------------------
   * DECISION ENGINE
   * ----------------------------------------------------
   */

  const ranking =
    alternatives.length > 0
      ? `#1 OF ${alternatives.length}`
      : "—"

  const revenue =
    recommendation?.gross_revenue !== undefined
      ? `₹${formatCurrency(recommendation.gross_revenue)}`
      : "—"

  const costAnalysis =
    recommendation?.transport_cost !== undefined
      ? `₹${formatCurrency(recommendation.transport_cost)}`
      : "—"

  const optimization =
    hasResult
      ? "NET REALIZATION"
      : "—"

  /*
   * ----------------------------------------------------
   * AI AGENT
   * ----------------------------------------------------
   */

  const reasoning =
    hasResult
      ? "ACTIVE"
      : "STANDBY"

  const explanation =
    hasResult
      ? "GENERATED"
      : "—"

  const comparison =
    alternatives.length > 0
      ? `${alternatives.length} MARKETS`
      : "—"

  const decision =
    recommendation?.net_revenue !== undefined
      ? `₹${formatCurrency(recommendation.net_revenue)}`
      : "—"

  /*
   * ----------------------------------------------------
   * ARCHITECTURE LAYERS
   * ----------------------------------------------------
   */

  const layers = [
    {
      number: "01",
      title: "FARMER INPUT",
      description:
        "Crop, quantity, location and variety become the starting point for every decision.",
      items: [
        {
          label: "CROP",
          value: crop,
        },
        {
          label: "QUANTITY",
          value: quantity,
        },
        {
          label: "DISTRICT",
          value: district,
        },
        {
          label: "VARIETY",
          value: variety,
        },
      ],
    },

    {
      number: "02",
      title: "MARKET INTELLIGENCE",
      description:
        "Mandi prices and market conditions are processed to identify relevant selling opportunities.",
      items: [
        {
          label: "MANDI PRICES",
          value: mandiPrices,
        },
        {
          label: "MARKET DATA",
          value: marketData,
        },
        {
          label: "DISTANCE",
          value: distance,
        },
        {
          label: "TRANSPORT",
          value: transport,
        },
      ],
    },

    {
      number: "03",
      title: "DECISION ENGINE",
      description:
        "KisanMandi compares the economics of available markets instead of looking at price alone.",
      items: [
        {
          label: "RANKING",
          value: ranking,
        },
        {
          label: "REVENUE",
          value: revenue,
        },
        {
          label: "COST ANALYSIS",
          value: costAnalysis,
        },
        {
          label: "OPTIMIZATION",
          value: optimization,
        },
      ],
    },

    {
      number: "04",
      title: "AI AGENT",
      description:
        "The intelligence layer turns complex market calculations into a recommendation a farmer can understand.",
      items: [
        {
          label: "REASONING",
          value: reasoning,
        },
        {
          label: "EXPLANATION",
          value: explanation,
        },
        {
          label: "COMPARISON",
          value: comparison,
        },
        {
          label: "DECISION",
          value: decision,
        },
      ],
    },
  ]

  return (
    <section
      id="architecture"
      className="relative overflow-hidden bg-[#080a09] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-[-300px] top-[20%] h-[650px] w-[650px] rounded-full bg-lime-400/[0.025] blur-[170px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-20 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">

          <div>

            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-lime-400/60" />

              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                HOW IT WORKS
              </span>
            </div>

            <h2 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              FROM MARKET
              <br />
              DATA TO
              <br />
              BETTER DECISIONS.
            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-white/35 lg:pb-2 lg:text-base">
            KisanMandi combines structured market data, deterministic
            financial calculations and an intelligence layer to turn raw
            information into an actionable selling decision.
          </p>

        </div>

        {/* Architecture flow */}
        <div className="relative">

          {/* Connecting line */}
          <div className="pointer-events-none absolute left-[20px] top-0 hidden h-full w-px bg-gradient-to-b from-lime-400/30 via-white/[0.08] to-transparent lg:block" />

          <div className="space-y-3">

            {layers.map((layer, index) => (
              <ArchitectureLayer
                key={layer.number}
                layer={layer}
                index={index}
                active={hasResult}
              />
            ))}

          </div>

        </div>

        {/* System principle */}
        <div className="mt-20 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">

          {/* Core principle */}
          <div className="rounded-2xl border border-lime-400/15 bg-lime-400/[0.025] p-7 sm:p-9">

            <span className="text-[9px] uppercase tracking-[0.22em] text-lime-400/60">
              CORE PRINCIPLE
            </span>

            <div className="mt-8">

              <span className="block text-4xl font-semibold tracking-[-0.04em] text-white/90">
                DATA
              </span>

              <span className="my-1 block text-xl text-white/20">
                +
              </span>

              <span className="block text-4xl font-semibold tracking-[-0.04em] text-white/90">
                INTELLIGENCE
              </span>

              <span className="my-1 block text-xl text-white/20">
                =
              </span>

              <span className="block text-4xl font-semibold tracking-[-0.04em] text-lime-400">
                DECISION
              </span>

            </div>

          </div>

          {/* Trust principles */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9">

            <span className="text-[9px] uppercase tracking-[0.22em] text-white/25">
              BUILT FOR TRUST
            </span>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">

              <Principle
                title="DETERMINISTIC"
                description="Revenue and transport calculations remain transparent and reproducible."
              />

              <Principle
                title="EXPLAINABLE"
                description="Recommendations are presented with the numbers behind the decision."
              />

              <Principle
                title="MODULAR"
                description="Market data, decision logic and intelligence can evolve independently."
              />

              <Principle
                title="FARMER FIRST"
                description="Technical complexity stays behind the interface."
              />

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col justify-between gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center">

          <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">
            KISANMANDI / SYSTEM ARCHITECTURE
          </span>

          <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">
            04 LAYERS
          </span>

        </div>

      </div>
    </section>
  )
}


/*
 * ----------------------------------------------------
 * ARCHITECTURE LAYER
 * ----------------------------------------------------
 */

function ArchitectureLayer({ layer, index, active }) {
  return (
    <div
      className={`group relative grid gap-7 rounded-2xl border p-7 transition-all duration-500 sm:p-9 lg:grid-cols-[100px_1fr_1fr] lg:items-center lg:gap-10 lg:pl-14 ${
        active
          ? "border-lime-400/15 bg-lime-400/[0.025]"
          : "border-white/[0.08] bg-white/[0.02]"
      } hover:border-white/[0.14] hover:bg-white/[0.035]`}
    >

      {/* Number */}
      <div className="flex items-center gap-4 lg:block">

        <span
          className={`text-[10px] font-medium tracking-[0.2em] ${
            active
              ? "text-lime-400"
              : "text-lime-400/60"
          }`}
        >
          {layer.number}
        </span>

        <div className="h-px w-8 bg-white/10 lg:mt-5" />

      </div>

      {/* Title + description */}
      <div>

        <h3 className="text-2xl font-medium uppercase tracking-[-0.03em] text-white/80 sm:text-3xl">
          {layer.title}
        </h3>

        <p className="mt-4 max-w-lg text-sm leading-6 text-white/35">
          {layer.description}
        </p>

      </div>

      {/* Dynamic values */}
      <div className="grid grid-cols-2 gap-2">

        {layer.items.map((item) => (

          <div
            key={item.label}
            className="rounded-lg border border-white/[0.07] bg-black/20 px-4 py-3 transition-all duration-300 group-hover:border-white/[0.1]"
          >

            <span className="block text-[9px] uppercase tracking-[0.15em] text-white/35">
              {item.label}
            </span>

            <span
              className={`mt-2 block truncate text-xs font-medium uppercase tracking-[0.05em] ${
                item.value !== "—"
                  ? "text-white/70"
                  : "text-white/25"
              }`}
            >
              {item.value ?? "—"}
            </span>

          </div>

        ))}

      </div>

      {/* Active indicator */}
      <div
        className={`pointer-events-none absolute right-6 top-6 h-2 w-2 rounded-full transition-all duration-500 ${
          active
            ? "bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.7)]"
            : "bg-lime-400/0 group-hover:bg-lime-400/70"
        }`}
      />

    </div>
  )
}


/*
 * ----------------------------------------------------
 * TRUST PRINCIPLE
 * ----------------------------------------------------
 */

function Principle({ title, description }) {
  return (
    <div>

      <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
        {title}
      </h4>

      <p className="mt-3 text-sm leading-6 text-white/30">
        {description}
      </p>

    </div>
  )
}


/*
 * ----------------------------------------------------
 * CURRENCY FORMATTER
 * ----------------------------------------------------
 */

function formatCurrency(value) {
  if (value === null || value === undefined || value === "") {
    return "—"
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)
}


export default Architecture