import type { Lang } from "@/lib/content";

type Slot = {
  /** Set to `/brand/packaging-N.jpg` when photos are uploaded */
  src?: string;
  caption: { ka: string; en: string };
  label: string;
};

const slots: Slot[] = [
  {
    label: "packaging-1",
    caption: { ka: "კრაფტ შეფუთვა", en: "Kraft sleeve" },
  },
  {
    label: "packaging-2",
    caption: { ka: "ღია პორცია", en: "Open meal" },
  },
  {
    label: "packaging-3",
    caption: { ka: "დეტალი / ტექსტურა", en: "Detail / texture" },
  },
];

type Props = {
  lang: Lang;
  t: (o: { ka: string; en: string }) => string;
};

/** Packaging / visual band — placeholder frames until real photos land in public/brand/. */
export function PackagingVisual({ lang, t }: Props) {
  return (
    <section id="packaging" className="border-b border-garnet bg-kraft paper-grain">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h2 className="font-display text-3xl font-black text-garnet md:text-4xl">
          {t({ ka: "შეფუთვა და ვიზუალი", en: "Packaging & visual" })}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/80 md:text-base">
          {t({
            ka: "100% ბიოდეგრადირებადი კრაფტი — გარეთ ატლასი, შიგნით ათასი. ფოტოები მალე დაემატება.",
            en: "100% biodegradable kraft — satin outside, a thousand within. Photos coming soon.",
          })}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {slots.map((slot) => (
            <figure key={slot.label} className="border border-garnet bg-cream">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                {slot.src ? (
                  <img
                    src={slot.src}
                    alt={slot.caption[lang]}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center font-mono text-[11px] uppercase tracking-wide text-cream/70">
                    <span className="text-cream/40">[{slot.label}.jpg]</span>
                    <span>{slot.caption[lang]}</span>
                  </div>
                )}
              </div>
              <figcaption className="border-t border-garnet px-3 py-2 font-mono text-xs text-garnet">
                {slot.caption[lang]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
