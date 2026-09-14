import { useState } from "react"
import { getRecommendation } from "../../services/api"
function Calculator({onRecommendation}) {
  const [form, setForm] = useState({
    state: "",
    district: "",
    crop: "",
    variety: "",
    quantity: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState(null)
  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setResult(null)
    if (
      !form.state ||
      !form.district ||
      !form.crop ||
      !form.variety ||
      !form.quantity
    ) {
      setError("Please fill in all the farmer details.")
      return
    }
    if (Number(form.quantity) <= 0) {
      setError("Quantity must be greater than 0.")
      return
    }
    try {
      setLoading(true)
      const recommendation = await getRecommendation(form)
      setResult(recommendation)
      if (onRecommendation) {
        onRecommendation({
          farmer: {
            state: form.state,
            district: form.district,
            crop: form.crop,
            variety: form.variety,
            quantity: Number(form.quantity),
          },
          recommendation: recommendation.recommendation,
          alternatives: recommendation.alternatives || [],
        })
      }
      console.log("Mandi recommendation:", recommendation)
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while finding the best mandi."
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-[#080a09] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-lime-400/[0.025] blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-lime-400/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              MANDI CALCULATOR
            </span>
          </div>
          <h2 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
            FIND WHERE YOUR
            <br />
            CROP PAYS MORE.
          </h2>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Enter your crop details and location. KisanMandi will compare
            nearby markets and estimate where your crop can generate the
            strongest net realization.
          </p>
        </div>
        <div className="grid overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] backdrop-blur-sm lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-white/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
                FARMER DETAILS
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-lime-400/60">
                STEP 01
              </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="state"
                  className="mb-3 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  value={form.state}
                  onChange={(event) =>
                    updateField("state", event.target.value)
                  }
                  placeholder="e.g. Uttar Pradesh"
                  className="w-full border-b border-white/[0.12] bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-lime-400/60"
                />
              </div>
              <div>
                <label
                  htmlFor="district"
                  className="mb-3 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35"
                >
                  District
                </label>
                <input
                  id="district"
                  type="text"
                  value={form.district}
                  onChange={(event) =>
                    updateField("district", event.target.value)
                  }
                  placeholder="e.g. Kanpur Nagar"
                  className="w-full border-b border-white/[0.12] bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-lime-400/60"
                />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="crop"
                    className="mb-3 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35"
                  >
                    Crop
                  </label>
                  <input
                    id="crop"
                    type="text"
                    value={form.crop}
                    onChange={(event) =>
                      updateField("crop", event.target.value)
                    }
                    placeholder="e.g. Wheat"
                    className="w-full border-b border-white/[0.12] bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-lime-400/60"
                  />
                </div>
                <div>
                  <label
                    htmlFor="variety"
                    className="mb-3 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35"
                  >
                    Variety
                  </label>
                  <input
                    id="variety"
                    type="text"
                    value={form.variety}
                    onChange={(event) =>
                      updateField("variety", event.target.value)
                    }
                    placeholder="e.g. Dara"
                    className="w-full border-b border-white/[0.12] bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-lime-400/60"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="mb-3 block text-[10px] font-medium uppercase tracking-[0.22em] text-white/35"
                >
                  Quantity — Quintals
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(event) =>
                    updateField("quantity", event.target.value)
                  }
                  placeholder="e.g. 50"
                  className="w-full border-b border-white/[0.12] bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-lime-400/60"
                />
              </div>
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 rounded-full bg-lime-400 px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#07100a] transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_35px_rgba(163,230,53,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Finding Best Mandi..."
                    : "Find My Best Mandi"}
                  <span
                    className={`transition-transform duration-300 ${
                      loading
                        ? "animate-pulse"
                        : "group-hover:translate-x-1"
                    }`}
                  >
                    →
                  </span>
                </button>
              </div>
              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/[0.04] px-5 py-4">
                  <p className="text-xs leading-5 text-red-300/80">
                    {error}
                  </p>
                </div>
              )}
            </form>
          </div>
          <div className="relative flex flex-col justify-between p-8 sm:p-10 lg:p-12">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
                  KISANMANDI ENGINE
                </span>
                <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-lime-400/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                  {loading ? "ANALYZING" : "READY"}
                </span>
              </div>
              <div className="mt-14">
                <p className="max-w-sm text-2xl font-medium leading-tight tracking-[-0.025em] text-white sm:text-3xl">
                  Don't choose the
                  <span className="text-white/30">
                    {" "}closest mandi.
                  </span>
                  <br />
                  Choose the
                  <span className="text-lime-400">
                    {" "}smartest one.
                  </span>
                </p>
              </div>
              <div className="mt-14 space-y-7">
                <div className="flex gap-5">
                  <span className="pt-0.5 text-[10px] font-medium tracking-[0.15em] text-lime-400/70">
                    01
                  </span>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                      Market Price
                    </h3>
                    <p className="mt-2 max-w-xs text-xs leading-5 text-white/30">
                      Compare available mandi prices for your crop and variety.
                    </p>
                  </div>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex gap-5">
                  <span className="pt-0.5 text-[10px] font-medium tracking-[0.15em] text-lime-400/70">
                    02
                  </span>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                      Transport Cost
                    </h3>
                    <p className="mt-2 max-w-xs text-xs leading-5 text-white/30">
                      Account for the estimated cost of reaching each market.
                    </p>
                  </div>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex gap-5">
                  <span className="pt-0.5 text-[10px] font-medium tracking-[0.15em] text-lime-400/70">
                    03
                  </span>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                      Net Realization
                    </h3>
                    <p className="mt-2 max-w-xs text-xs leading-5 text-white/30">
                      See what you could actually earn after transportation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-14 border-t border-white/[0.07] pt-6">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">
                  DATA → DISTANCE → DECISION
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                  KISANMANDI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Calculator