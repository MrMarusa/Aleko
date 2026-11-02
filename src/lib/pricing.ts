// Placeholder demo pricing — replace with the kitchen's real rates.
export type Frequency = "5d" | "3d" | "flex";
export const BASE_PRICE = 18; // GEL per portion, food
export const DELIVERY_PER_PORTION = 1.5; // GEL
export const VAT = 0.18;
export const DAYS_PER_MONTH: Record<Frequency, number> = { "5d": 22, "3d": 13, flex: 16 };

export function volumeDiscount(team: number) {
  if (team >= 300) return 0.22;
  if (team >= 150) return 0.15;
  if (team >= 50) return 0.08;
  return 0;
}

export function quote(team: number, freq: Frequency, includeVat: boolean) {
  const unitFood = +(BASE_PRICE * (1 - volumeDiscount(team))).toFixed(2);
  const days = DAYS_PER_MONTH[freq];
  const portions = team * days;
  const food = unitFood * portions;
  const delivery = DELIVERY_PER_PORTION * portions;
  const subtotal = food + delivery;
  const tax = includeVat ? subtotal * VAT : 0;
  return { unitFood, unit: unitFood + DELIVERY_PER_PORTION, days, portions, food, delivery, tax, total: subtotal + tax };
}
