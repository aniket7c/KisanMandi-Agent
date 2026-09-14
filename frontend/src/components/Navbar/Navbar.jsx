import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "THE DILEMMA", href: "#dilemma" },
    { label: "INTELLIGENCE", href: "#intelligence" },
    { label: "FIND MANDI", href: "#calculator" },
    { label: "LIVE DATA", href: "#live-data" },
    { label: "AGENTS & TECH", href: "#architecture" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <nav
        className="
          mx-auto
          flex
          h-[72px]
          w-full
          items-center
          border-b
          border-white/[0.08]
          bg-[#061b13]/95
          px-6
          backdrop-blur-xl
          md:px-10
          lg:px-[60px]
        "
      >
        {/* ================= LOGO ================= */}
        <a
          href="#hero"
          className="flex shrink-0 items-center gap-3"
        >
          {/* Logo circle */}
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-lime-400/30
              bg-lime-400/[0.05]
            "
          >
            <div
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-lime-400
                shadow-[0_0_12px_rgba(163,230,53,0.7)]
              "
            />
          </div>

          {/* Logo text */}
          <div className="leading-none">
            <div
              className="
                text-[15px]
                font-bold
                tracking-[0.18em]
                text-[#f4f1e8]
              "
            >
              KISANMANDI
            </div>

            <div
              className="
                mt-1
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-lime-400/80
              "
            >
              AI INTELLIGENCE ENGINE
            </div>
          </div>
        </a>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div
          className="
            ml-auto
            hidden
            items-center
            gap-8
            lg:flex
          "
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                whitespace-nowrap
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white/55
                transition-all
                duration-300
                hover:text-white
              "
            >
              {item.label}
            </a>
          ))}

          {/* ================= LIVE DATA BADGE ================= */}
          <div
            className="
              ml-1
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.03]
              px-4
              py-2
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.8)]
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                leading-[10px]
                tracking-wide
                text-white/45
              "
            >
              Agmarknet
              <br />
              Live
            </span>
          </div>

          {/* ================= CTA ================= */}
          <a
            href="#calculator"
            className="
              ml-1
              flex
              min-h-[48px]
              items-center
              rounded-full
              bg-lime-400
              px-7
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#07140e]
              transition-all
              duration-300
              hover:bg-lime-300
              hover:shadow-[0_0_30px_rgba(163,230,53,0.25)]
            "
          >
            FIND MY MANDI
          </a>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            ml-auto
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            lg:hidden
          "
        >
          <div className="flex w-4 flex-col gap-1.5">
            <span
              className={`
                h-px
                w-full
                bg-white
                transition-all
                duration-300
                ${menuOpen ? "translate-y-[4px] rotate-45" : ""}
              `}
            />

            <span
              className={`
                h-px
                w-full
                bg-white
                transition-all
                duration-300
                ${menuOpen ? "opacity-0" : ""}
              `}
            />

            <span
              className={`
                h-px
                w-full
                bg-white
                transition-all
                duration-300
                ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}
              `}
            />
          </div>
        </button>
      </nav>

      {/* ================= MOBILE NAVIGATION ================= */}
      <div
        className={`
          overflow-hidden
          border-b
          border-white/[0.08]
          bg-[#061b13]/98
          backdrop-blur-xl
          transition-all
          duration-300
          lg:hidden
          ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }
        `}
      >
        <div className="flex flex-col px-6 py-5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="
                border-b
                border-white/[0.06]
                py-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.15em]
                text-white/60
                transition-colors
                hover:text-white
              "
            >
              {item.label}
            </a>
          ))}

          <a
            href="#calculator"
            onClick={() => setMenuOpen(false)}
            className="
              mt-5
              flex
              h-12
              items-center
              justify-center
              rounded-full
              bg-lime-400
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#07140e]
            "
          >
            FIND MY MANDI
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;