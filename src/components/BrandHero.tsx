/** Full-viewport black hero — only the ნუნუკა brow mark, centered. */
export function BrandHero() {
  return (
    <section
      id="top"
      className="flex min-h-[calc(100svh-4.5rem)] items-center justify-center bg-cream paper-grain px-6 py-10 md:min-h-[calc(100svh-5rem)]"
      aria-label="ნუნუკა"
    >
      <img
        src="/brand/brow.png"
        alt="ნუნუკა — გარეთ ატლასი • შიგნით ათასი"
        className="h-auto w-full max-w-[min(92vw,520px)] object-contain md:max-w-[min(70vw,640px)]"
        width={640}
        height={640}
        decoding="async"
        fetchPriority="high"
      />
    </section>
  );
}
