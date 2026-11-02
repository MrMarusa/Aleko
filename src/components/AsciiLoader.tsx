import { useEffect, useState } from "react";
import { ASCII_ART } from "@/lib/ascii-art";

const COLS = 335;
const ROWS = 151;

export function AsciiLoader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [pct, setPct] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (sessionStorage.getItem("seen-loader")) return;
    setShow(true);
    const fit = () => {
      const w = Math.min(window.innerWidth - 48, 900);
      const h = window.innerHeight * 0.58;
      setScale(Math.min(w / (COLS * 6), h / (ROWS * 12)));
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
      <div
        className="border border-garnet bg-kraft shadow-[6px_6px_0_var(--ink)]"
        style={{ width: COLS * 6 * scale + 28, height: ROWS * 12 * scale + 28 }}
      >
        <div className="h-full overflow-hidden border border-dashed border-garnet/40 p-2.5">
          <pre
            aria-hidden
            className="m-0 origin-top-left animate-print font-mono text-garnet"
            style={{ fontSize: 10, lineHeight: "12px", transform: `scale(${scale})`, width: COLS * 6 }}
          >
            {ASCII_ART}
          </pre>
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
