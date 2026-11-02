/** SVG kraft-package / steam visual anchor for the hero plane */
export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute -right-8 top-1/2 h-[min(78vh,640px)] w-[min(92vw,560px)] -translate-y-1/2 text-garnet opacity-[0.88] md:right-[4%] md:w-[min(48vw,520px)]"
        viewBox="0 0 420 520"
        fill="none"
      >
        {/* kraft sleeve */}
        <rect x="78" y="120" width="240" height="300" fill="#C4B29A" stroke="currentColor" strokeWidth="2.5" />
        <rect x="78" y="120" width="240" height="42" fill="#B8A68F" stroke="currentColor" strokeWidth="2.5" />
        <path d="M78 162 H318" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" />
        {/* folded flap */}
        <path d="M78 120 L198 70 L318 120" fill="#D6C7B2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M118 120 L198 88 L278 120" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
        {/* label plate */}
        <rect x="118" y="210" width="160" height="110" fill="#F4EFE6" stroke="currentColor" strokeWidth="2" />
        <text
          x="198"
          y="248"
          textAnchor="middle"
          fill="currentColor"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.12em" }}
        >
          სუფრა
        </text>
        <text
          x="198"
          y="272"
          textAnchor="middle"
          fill="currentColor"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.18em" }}
        >
          DISPATCH
        </text>
        <line x1="138" y1="288" x2="258" y2="288" stroke="currentColor" strokeWidth="1" />
        <text
          x="198"
          y="308"
          textAnchor="middle"
          fill="currentColor"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9 }}
        >
          BATCH #4 · HOT
        </text>
        {/* steam */}
        <g className="animate-steam origin-bottom" style={{ transformOrigin: "198px 70px" }}>
          <path d="M168 70 C160 40 180 28 172 8" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
          <path d="M198 62 C192 34 210 24 204 4" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
          <path d="M228 70 C236 42 216 30 224 10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        </g>
        {/* shadow slab */}
        <rect x="98" y="430" width="220" height="14" fill="#1A1615" opacity="0.12" />
      </svg>
    </div>
  );
}
