import { useEffect, useState } from "react";
import { ASCII_ART_COLORED_HTML } from "@/lib/ascii-art-colored";

export function AsciiLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [pct, setPct] = useState(0);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    if (sessionStorage.getItem("seen-loader")) return;
    setShow(true);
    const fit = () => {
      const w = Math.min(window.innerWidth - 48, 920);
      const h = window.innerHeight * 0.55;
      // Approximate natural canvas ~ 335*6 x 151*12 from legacy metrics; colored art is similar width
      setScale(Math.min(w / 2010, h / 1812, 0.55));
    };
    fit();
    window.addEventListener("resize", fit);
    const start = Date.now();
    const iv = setInterval(
      () => setPct(Math.min(100, Math.round(((Date.now() - start) / 1800) * 100))),
      50,
    );
    const t1 = setTimeout(() => setLeaving(true), 2000);
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("seen-loader", "1");
    }, 2600);
    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", fit);
    };
  }, []);

  if (!show) return null;
  const bar = 24;
  const filled = Math.round((pct / 100) * bar);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-kraft paper-grain px-6 ${leaving ? "animate-loader-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Printing dispatch"
    >
      <div className="overflow-hidden border border-garnet bg-kraft shadow-[6px_6px_0_var(--ink)]">
        <div className="max-h-[58vh] max-w-[min(92vw,900px)] overflow-hidden p-3">
          <pre
            aria-hidden
            className="m-0 origin-top-left animate-print font-mono"
            style={{ fontSize: 10, lineHeight: 1.2, transform: `scale(${scale})`, width: "fit-content" }}
            dangerouslySetInnerHTML={{ __html: ASCII_ART_COLORED_HTML }}
          />
        </div>
      </div>
      <div className="space-y-2 text-center font-mono text-xs text-ink">
        <div className="text-garnet">::: /// BATCH #4 :: PRINTING DISPATCH … {pct}% /// :::</div>
        <div className="tracking-widest">
          [{"=".repeat(filled)}
          {"-".repeat(bar - filled)}]
        </div>
      </div>
    </div>
  );
}
