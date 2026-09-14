import { useState } from "react"

function Chat({ data }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage || loading) return

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: trimmedMessage,
      },
    ])

    setMessage("")
    setLoading(true)

    try {
      /*
       * If the farmer has already used the calculator,
       * include the calculator context with the question.
       *
       * This allows the agent to know:
       * - where the farmer is located
       * - what crop they are selling
       * - which variety they have
       * - how much produce they have
       *
       * If the calculator has not been used yet,
       * send the question normally.
       */
      const contextualMessage = data?.farmer
        ? `Farmer context:
State: ${data.farmer.state}
District: ${data.farmer.district}
Crop: ${data.farmer.crop}
Variety: ${data.farmer.variety}
Quantity: ${data.farmer.quantity} quintals

Farmer's question:
${trimmedMessage}`
        : trimmedMessage

      const response = await fetch(
        "https://kisanmandi-agent.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: contextualMessage,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Chat request failed")
      }

      const responseData = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: responseData.response,
        },
      ])
    } catch (error) {
      console.error("Chat error:", error)

      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content:
            "Sorry, I couldn't connect to the KisanMandi agent right now. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <section
      id="chat"
      className="relative overflow-hidden bg-[#080a09] px-6 py-28 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-[-220px] top-[20%] h-[500px] w-[500px] rounded-full bg-lime-400/[0.025] blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="max-w-4xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-lime-400/60" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              ASK KISANMANDI
            </span>
          </div>

          <h2 className="text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            ASK THE
            <br />
            <span className="text-lime-400">MANDI AGENT.</span>
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Ask questions about mandi prices, where to sell, transport costs,
            or the best option for your crop.
          </p>
        </div>

        {/* Chat container */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">

          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                KISANMANDI AGENT
              </span>
            </div>

            <span className="text-[9px] uppercase tracking-[0.18em] text-white/20">
              AI ASSISTANT
            </span>
          </div>

          {/* Messages */}
          <div className="min-h-[320px] max-h-[520px] space-y-5 overflow-y-auto p-6 lg:p-8">

            {messages.length === 0 && (
              <div className="flex min-h-[260px] items-center justify-center">
                <div className="max-w-md text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-lime-400/15 bg-lime-400/[0.04]">
                    <span className="text-lg text-lime-400">
                      ?
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-medium text-white/80">
                    What would you like to know?
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/30">
                    Try asking something like:
                  </p>

                  <p className="mt-2 text-sm text-lime-400/60">
                    "Where should I sell my wheat?"
                  </p>

                </div>
              </div>
            )}

            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-6 ${
                    item.role === "user"
                      ? "bg-lime-400 text-black"
                      : "border border-white/[0.08] bg-white/[0.035] text-white/70"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 text-sm text-white/40">
                  Agent is thinking...
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <div className="border-t border-white/[0.08] p-4 lg:p-5">
            <div className="flex items-end gap-3">

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask the mandi agent..."
                rows={1}
                disabled={loading}
                className="min-h-[52px] flex-1 resize-none rounded-xl border border-white/[0.08] bg-black/20 px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-lime-400/30 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={!message.trim() || loading}
                className="flex h-[52px] shrink-0 items-center justify-center rounded-xl bg-lime-400 px-6 text-sm font-semibold text-black transition-all duration-200 hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-30"
              >
                SEND
              </button>

            </div>

            <p className="mt-3 px-1 text-[9px] uppercase tracking-[0.16em] text-white/15">
              ENTER TO SEND · SHIFT + ENTER FOR NEW LINE
            </p>
          </div>

        </div>

        {/* Bottom statement */}
        <div className="mt-10 flex flex-col justify-between gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center">

          <p className="max-w-xl text-xs leading-6 text-white/25">
            Ask naturally. The AI agent can reason over mandi information
            instead of requiring you to navigate through complicated forms.
          </p>

          <span className="text-[9px] uppercase tracking-[0.22em] text-white/15">
            AGENT INTERFACE / 01
          </span>

        </div>

      </div>
    </section>
  )
}

export default Chat