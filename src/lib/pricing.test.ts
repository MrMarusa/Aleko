import { describe, it, expect } from "vitest";
import { quote, volumeDiscount } from "./pricing";

describe("pricing", () => {
  it("no discount under 50", () => expect(volumeDiscount(49)).toBe(0));
  it("22% at 300+", () => expect(volumeDiscount(300)).toBe(0.22));
  it("5-day month for 10 people without VAT", () => {
    const q = quote(10, "5d", false);
    expect(q.portions).toBe(220);
    expect(q.total).toBeCloseTo(220 * 19.5);
  });
  it("adds 18% VAT", () => {
    const q = quote(10, "5d", true);
    expect(q.total).toBeCloseTo(220 * 19.5 * 1.18);
  });
});
