import { useEffect, useRef, useState, type ReactNode } from "react";
import { ASCII_ART_COLORED_HTML } from "@/lib/ascii-art-colored";

type Props = {
  brand: ReactNode;
  headline: string;
  support: string;
  primaryCta: ReactNode;
  secondaryCta: ReactNode;
};

/** Full-bleed kraft home hero with brand-garnet ASCII art as the visual anchor. */
export function AsciiHero({ brand, headline, support, primaryCta, secondaryCta }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [scale, setScale] = useState(0.35);

  useEffect(() => {
    const fit = () => {
      const frame = frameRef.current;
      const pre = preRef.current;
      if (!frame || !pre) return;
      // Measure natural size at fontSize 10 / line-height 1.2
      const naturalW = pre.scrollWidth;
      const naturalH = pre.scrollHeight;
      if (!naturalW || !naturalH) return;
      const pad = 24;
      const availW = Math.max(frame.clientWidth - pad, 120);
      const availH = Math.max(frame.clientHeight - pad, 120);
      setScale(Math.min(availW / naturalW, availH / naturalH, 1));
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (frameRef.current) ro.observe(frameRef.current);
    window.addEventListener("resize", fit);
    // Re-fit after fonts settle
    const t = window.setTimeout(fit, 120);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section className="hero-atmosphere relative isolate overflow-hidden border-b border-garnet">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] md:items-center md:gap-8 md:py-10 lg:min-h-[calc(100svh-5.25rem)]">
        <div className="animate-hero-rise relative z-10 order-2 md:order-1">
          {brand}
          <h1 className="mt-5 max-w-[18ch] font-display text-2xl font-bold leading-[1.15] text-ink md:mt-6 md:text-3xl lg:text-4xl">
            {headline}
          </h1>
          <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-ink/85 md:text-lg">{support}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {primaryCta}
            {secondaryCta}
          </div>
        </div>

        <div
          ref={frameRef}
          className="animate-hero-rise relative order-1 flex min-h-[42vh] items-center justify-center overflow-hidden border border-garnet bg-kraft/40 shadow-[5px_5px_0_var(--ink)] md:order-2 md:min-h-[min(68vh,560px)]"
          style={{ animationDelay: "80ms" }}
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-0 paper-grain opacity-70" />
          <pre
            ref={preRef}
            className="m-0 origin-center font-mono text-garnet"
            style={{
              fontSize: 10,
              lineHeight: 1.2,
              transform: `scale(${scale})`,
              whiteSpace: "pre",
            }}
            dangerouslySetInnerHTML={{ __html: ASCII_ART_COLORED_HTML }}
          />
        </div>
      </div>
    </section>
  );
}
