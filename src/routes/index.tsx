import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { AsciiLoader } from "@/components/AsciiLoader";
import { AsciiHero } from "@/components/AsciiHero";
import { useCountUp } from "@/hooks/use-count-up";
import { dict, days, menu, tagLabels, districts, type Lang, type Dish } from "@/lib/content";
import { quote, volumeDiscount, type Frequency } from "@/lib/pricing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "სუფრა Dispatch — Corporate Georgian Lunch Catering, Tbilisi" },
      {
        name: "description",
        content:
          "Honest Georgian daily lunches for corporate teams of 15–500+ in Tbilisi. Hot, on time, kraft packaging.",
      },
      { property: "og:title", content: "სუფრა Dispatch — Corporate Catering Tbilisi" },
      {
        property: "og:description",
        content: "Georgian feasting with surgical kitchen rigor for Tbilisi offices.",
      },
    ],
  }),
  component: Index,
});

const DIV = "+---+===+---+===+---+===+---+===+---+===+---+===+---+";
const gel = (n: number) =>
  `₾ ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Index() {
  const [lang, setLang] = useState<Lang>("ka");
  const t = (o: { ka: string; en: string }) => o[lang];
  const [lead, setLead] = useState(false);

  return (
    <div className="min-h-screen bg-kraft paper-grain">
      <AsciiLoader />
      <header className="sticky top-0 z-40 border-b border-garnet bg-cream/95 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:py-5">
          <a href="#top" className="font-display text-2xl font-black text-garnet md:text-3xl">
            სუფრა
            <span className="font-mono text-xs font-normal tracking-[0.16em] text-ink md:text-sm">
              {" "}
              /DISPATCH
            </span>
          </a>
          <nav className="hidden gap-8 font-mono text-sm uppercase tracking-wide md:flex">
            <a href="#menu" className="hover:text-garnet">
              {t(dict.nav.menu)}
            </a>
            <a href="#calc" className="hover:text-garnet">
              {t(dict.nav.calc)}
            </a>
          </nav>
          <div className="flex border border-garnet font-mono text-sm" role="group" aria-label="Language">
            {(["ka", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-4 py-2 uppercase transition-colors ${lang === l ? "bg-garnet text-cream" : "bg-cream text-garnet hover:bg-kraft"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        <AsciiHero
          brand={
            <p className="font-display text-4xl font-black leading-none text-garnet sm:text-5xl md:text-6xl">
              სუფრა
              <span className="mt-2 block font-mono text-sm font-normal tracking-[0.22em] text-ink md:text-base">
                /DISPATCH
              </span>
            </p>
          }
          headline={t(dict.h1)}
          support={t(dict.sub)}
          primaryCta={
            <button type="button" onClick={() => setLead(true)} className="btn-ink">
              {t(dict.cta1)}
            </button>
          }
          secondaryCta={
            <a href="#menu" className="btn-paper">
              {t(dict.cta2)}
            </a>
          }
        />

        <section className="border-b border-garnet bg-garnet text-cream">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3.5 font-mono text-xs md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 animate-pulse bg-cream" aria-hidden />
              {t(dict.status)}
            </div>
            <div className="flex items-center gap-3">
              <span>
                780 / 1,200 {t(dict.capacity)}
              </span>
              <div className="h-2 w-36 border border-cream sm:w-40" aria-hidden>
                <div className="h-full bg-cream" style={{ width: "65%" }} />
              </div>
            </div>
          </div>
        </section>

        <MenuSection lang={lang} t={t} />
        <Calculator lang={lang} t={t} onLead={() => setLead(true)} />
      </main>

      <footer className="border-t border-garnet bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-8 font-mono text-xs">
          <div className="overflow-hidden whitespace-nowrap text-garnet">
            {DIV}
            {DIV}
          </div>
          <div className="mt-4 flex flex-col justify-between gap-2 text-ink md:flex-row">
            <span>სუფრა DISPATCH · TBILISI · KITCHEN 06:00–14:00 · 7/7</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>

      {lead && <LeadModal t={t} onClose={() => setLead(false)} />}
    </div>
  );
}

type TP = { lang: Lang; t: (o: { ka: string; en: string }) => string };

function MenuSection({ t }: TP) {
  const [day, setDay] = useState(0);
  const [open, setOpen] = useState<Dish | null>(null);
  const tabPct = 100 / days.length;
  return (
    <section id="menu" className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <h2 className="font-display text-3xl font-black text-garnet md:text-4xl">{t(dict.dispatch)}</h2>
      <p className="mt-2 max-w-2xl text-sm text-ink/80 md:text-base">{t(dict.dayHint)}</p>
      <div className="-mx-5 mt-6 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
        <div className="relative grid min-w-[28rem] grid-cols-7 border border-garnet bg-cream md:min-w-0">
          <div
            className="absolute inset-y-0 bg-garnet transition-all duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${tabPct}%`, left: `${day * tabPct}%` }}
          />
          {days.map((d, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setDay(i)}
              className={`relative z-10 py-3.5 font-mono text-sm font-bold md:text-base ${day === i ? "text-cream" : "text-garnet"}`}
            >
              {d.en}
            </button>
          ))}
        </div>
      </div>
      <div key={day} className="divide-y divide-garnet border border-t-0 border-garnet bg-cream">
        {(menu[day] ?? []).map((m, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(m)}
            className="group grid w-full gap-2 px-4 py-4 text-left transition-colors hover:bg-kraft/50 active:translate-y-px md:grid-cols-[1fr_auto] md:items-end md:gap-3 md:px-5"
          >
            <div>
              <div className="flex flex-wrap gap-1.5">
                {m.tags.slice(0, 2).map((tg) => (
                  <span key={tg} className="font-mono text-[10px] uppercase tracking-wide text-garnet">
                    {t(tagLabels[tg] ?? { ka: tg, en: tg })}
                  </span>
                ))}
              </div>
              <h3 className="mt-1.5 font-display text-xl font-black text-garnet md:text-2xl">{t(m.name)}</h3>
              <p className="mt-0.5 text-sm italic text-ink/75">{t(m.origin)}</p>
            </div>
            <div className="font-mono text-[11px] text-ink/70 md:text-right">
              <div>
                {m.grams}g · {m.kcal}kcal · P{m.p} F{m.f} C{m.c}
              </div>
              {m.allergens.length > 0 && (
                <div className="mt-1 uppercase text-garnet">⚠ {m.allergens.join(", ")}</div>
              )}
            </div>
          </button>
        ))}
      </div>
      {open && <Receipt dish={open} t={t} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Receipt({ dish, t, onClose }: { dish: Dish; t: TP["t"]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm border border-garnet bg-cream p-6 font-mono text-xs text-ink shadow-[6px_6px_0_var(--ink)]"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between">
          <span>THERMAL SLIP #{dish.prep.replace(":", "")}</span>
          <button type="button" onClick={onClose} aria-label="close">
            <X size={16} />
          </button>
        </div>
        <div className="my-3 text-center text-garnet">=============================</div>
        <div className="text-center font-display text-xl font-black text-garnet">{t(dish.name)}</div>
        <div className="text-center">{t(dish.origin)}</div>
        <div className="my-3">-----------------------------</div>
        <div className="space-y-1">
          <Row a="WEIGHT" b={`${dish.grams} g`} />
          <Row a="ENERGY" b={`${dish.kcal} kcal`} />
          <Row a="P / F / C" b={`${dish.p} / ${dish.f} / ${dish.c}`} />
          <Row a="PREP" b={`${dish.prep} • BATCH #4`} />
        </div>
        <div className="my-3">-----------------------------</div>
        <div className="uppercase text-garnet">Ingredients</div>
        <p>{t(dish.ingredients)}</p>
        <div className="mt-3 uppercase text-garnet">Heating</div>
        <p>{t(dish.heat)}</p>
        <div className="my-3 text-center text-garnet">::: /// :::</div>
      </div>
    </div>
  );
}

const Row = ({ a, b }: { a: string; b: string }) => (
  <div className="flex justify-between gap-2">
    <span>{a}</span>
    <span className="flex-1 overflow-hidden whitespace-nowrap text-muted-foreground">{"·".repeat(60)}</span>
    <span>{b}</span>
  </div>
);

function Calculator({ t, onLead }: TP & { onLead: () => void }) {
  const [team, setTeam] = useState(80);
  const [freq, setFreq] = useState<Frequency>("5d");
  const [vat, setVat] = useState(true);
  const [flash, setFlash] = useState(false);
  const q = quote(team, freq, vat);
  const animatedTotal = useCountUp(q.total);
  const animatedUnit = useCountUp(q.unit);

  const bump = () => {
    setFlash(true);
    window.setTimeout(() => setFlash(false), 380);
  };

  return (
    <section id="calc" className="border-y border-garnet bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-2 md:gap-10 md:py-16">
        <div>
          <h2 className="font-display text-3xl font-black text-garnet md:text-4xl">{t(dict.calcTitle)}</h2>
          <p className="mt-2 max-w-md text-sm text-ink/80">{t(dict.calcSub)}</p>
          <label className="mt-8 block font-mono text-xs uppercase tracking-wide">
            {t(dict.team)}:{" "}
            <span className="text-2xl font-bold text-garnet tabular-nums">{team >= 500 ? "500+" : team}</span>
          </label>
          <input
            type="range"
            min={10}
            max={500}
            value={team}
            onChange={(e) => {
              setTeam(+e.target.value);
              bump();
            }}
            className="mt-3 w-full accent-garnet"
          />
          <div className="mt-1 font-mono text-[10px]">−{Math.round(volumeDiscount(team) * 100)}% VOLUME</div>
          <div className="mt-6 font-mono text-xs uppercase tracking-wide">{t(dict.freq)}</div>
          <div className="mt-2 grid grid-cols-3 border border-garnet">
            {([["5d", dict.f5], ["3d", dict.f3], ["flex", dict.fflex]] as const).map(([k, l]) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setFreq(k);
                  bump();
                }}
                className={`py-3 text-xs transition-colors ${freq === k ? "bg-garnet text-cream" : "bg-transparent text-garnet hover:bg-kraft/60"}`}
              >
                {t(l)}
              </button>
            ))}
          </div>
          <label className="mt-5 flex items-center gap-3 font-mono text-xs">
            <input
              type="checkbox"
              checked={vat}
              onChange={(e) => {
                setVat(e.target.checked);
                bump();
              }}
              className="h-4 w-4 accent-garnet"
            />
            {t(dict.vat)}
          </label>
        </div>
        <div
          className={`calc-panel panel self-start p-5 font-mono text-sm shadow-[4px_4px_0_var(--ink)] md:p-6 ${flash ? "calc-flash" : ""}`}
        >
          <div className="overflow-hidden whitespace-nowrap text-garnet">{DIV}</div>
          <div className="my-3 space-y-2">
            <Row a={t(dict.unit)} b={gel(animatedUnit)} />
            <Row a={`${t(dict.food)} (${q.portions})`} b={gel(q.food)} />
            <Row a={t(dict.delivery)} b={gel(q.delivery)} />
            <Row a={t(dict.tax)} b={gel(q.tax)} />
          </div>
          <div className="overflow-hidden whitespace-nowrap text-garnet">{DIV}</div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <span className="text-xs uppercase tracking-wide">{t(dict.total)}</span>
            <span className="text-3xl font-bold tabular-nums text-garnet md:text-4xl">{gel(animatedTotal)}</span>
          </div>
          <button type="button" onClick={onLead} className="btn-ink mt-5 w-full">
            {t(dict.lead)}
          </button>
          <p className="mt-2 text-[10px] text-muted-foreground">* DEMO RATES</p>
        </div>
      </div>
    </section>
  );
}

function LeadModal({ t, onClose }: { t: TP["t"]; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const field =
    "w-full border border-garnet bg-cream px-3 py-2 font-mono text-sm outline-none focus:bg-kraft";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="panel w-full max-w-md p-6 shadow-[6px_6px_0_var(--ink)]"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between gap-4">
          <h3 className="font-display text-2xl font-black text-garnet">{t(dict.lead)}</h3>
          <button type="button" onClick={onClose} aria-label="close">
            <X />
          </button>
        </div>
        {sent ? (
          <div className="py-10 text-center font-mono text-sm">
            ::: /// RECEIVED /// :::
            <br />
            We'll call within 2 working hours.
          </div>
        ) : (
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input required placeholder="Company name / კომპანია" className={field} />
            <select required className={field} defaultValue="">
              <option value="" disabled>
                District / უბანი
              </option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <input required pattern="\d{9,11}" placeholder="საიდენტიფიკაციო კოდი (9–11)" className={field} />
            <input required placeholder="Office admin — name, phone" className={field} />
            <input required type="date" className={field} />
            <button type="submit" className="btn-ink w-full">
              {t(dict.lead)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
