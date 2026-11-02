export type Lang = "ka" | "en";
type T = { ka: string; en: string };

/** Numbered service days 1–7 (weekdays + weekend/holiday). */
export const days: T[] = [
  { ka: "1", en: "1" },
  { ka: "2", en: "2" },
  { ka: "3", en: "3" },
  { ka: "4", en: "4" },
  { ka: "5", en: "5" },
  { ka: "6", en: "6" },
  { ka: "7", en: "7" },
];

export const tagLabels: Record<string, T> = {
  fast: { ka: "სამარხვო", en: "Fasting / Vegan" },
  protein: { ka: "მაღალპროტეინიანი", en: "High Protein" },
  classic: { ka: "კლასიკური", en: "Classic Comfort" },
  gf: { ka: "უგლუტენო", en: "Gluten-Free" },
};

export type Dish = {
  name: T; origin: T; grams: number; kcal: number; p: number; f: number; c: number;
  tags: string[]; allergens: string[]; ingredients: T; heat: T; prep: string;
};

const d = (name: T, origin: T, grams: number, kcal: number, p: number, f: number, c: number, tags: string[], allergens: string[], ingredients: T, prep: string): Dish => ({
  name, origin, grams, kcal, p, f, c, tags, allergens, ingredients, prep,
  heat: { ka: "მიკროტალღა 2 წთ 800W ან ღუმელი 160°C 8 წთ", en: "Microwave 2 min 800W or oven 160°C 8 min" },
});

// Placeholder demo menu — days 1–5 work, 6–7 weekend/holiday
export const menu: Dish[][] = [
  [
    d({ ka: "ჩაქაფული", en: "Chakapuli" }, { ka: "ნელი ხარშვით, ტარხუნით", en: "Slow-braised with tarragon" }, 380, 520, 38, 24, 18, ["protein", "gf", "classic"], [], { ka: "ხბოს ხორცი, ტარხუნა, ტყემალი, მწვანე ხახვი, ღვინო", en: "Veal, tarragon, tkemali plum, spring onion, white wine" }, "06:40"),
    d({ ka: "ლობიო ქოთანში", en: "Lobio in Clay Pot" }, { ka: "რაჭული ტრადიცია", en: "Racha tradition" }, 350, 410, 19, 12, 54, ["fast", "gf"], [], { ka: "წითელი ლობიო, ქინძი, ხახვი, ნიორი", en: "Red beans, coriander, onion, garlic" }, "06:10"),
    d({ ka: "მჭადი", en: "Mchadi" }, { ka: "იმერული სიმინდი", en: "Imeretian cornmeal" }, 120, 260, 6, 4, 50, ["fast", "gf"], [], { ka: "სიმინდის ფქვილი, წყალი, მარილი", en: "Cornmeal, water, salt" }, "07:05"),
  ],
  [
    d({ ka: "ქათმის ჩახოხბილი", en: "Chicken Chakhokhbili" }, { ka: "პომიდვრით და ქინძით", en: "Tomato & coriander stew" }, 380, 480, 41, 18, 22, ["protein", "gf", "classic"], [], { ka: "ქათამი, პომიდორი, ხახვი, ქინძი", en: "Chicken, tomato, onion, coriander" }, "06:30"),
    d({ ka: "ბადრიჯანი ნიგვზით", en: "Eggplant with Walnut" }, { ka: "კახური რეცეპტი", en: "Kakhetian recipe" }, 220, 340, 8, 28, 14, ["fast", "gf"], ["nuts"], { ka: "ბადრიჯანი, ნიგოზი, ნიორი, ბროწეული", en: "Eggplant, walnut, garlic, pomegranate" }, "05:50"),
    d({ ka: "შოთი", en: "Shoti Bread" }, { ka: "თონეში გამომცხვარი", en: "Tone-oven baked" }, 150, 380, 12, 2, 78, ["fast"], ["gluten"], { ka: "ხორბლის ფქვილი, საფუარი, მარილი", en: "Wheat flour, yeast, salt" }, "07:15"),
  ],
  [
    d({ ka: "ოჯახური", en: "Ojakhuri" }, { ka: "სვანური მარილით შებოლილი", en: "Svanetian-salt smoked" }, 400, 610, 36, 34, 38, ["protein", "classic", "gf"], [], { ka: "ღორის ხორცი, კარტოფილი, ხახვი, სვანური მარილი", en: "Pork, potato, onion, Svan salt" }, "06:20"),
    d({ ka: "ფხალი ასორტი", en: "Pkhali Trio" }, { ka: "ისპანახი, ჭარხალი, ლობიო", en: "Spinach, beet, bean" }, 200, 290, 9, 21, 16, ["fast", "gf"], ["nuts"], { ka: "ისპანახი, ჭარხალი, ნიგოზი, სუნელები", en: "Spinach, beet, walnut, spices" }, "05:40"),
  ],
  [
    d({ ka: "ხარჩო", en: "Kharcho" }, { ka: "მეგრული სიმწვავით", en: "Mingrelian heat" }, 450, 470, 32, 22, 30, ["protein", "classic", "gf"], ["nuts"], { ka: "საქონლის ხორცი, ბრინჯი, ნიგოზი, ტყემალი", en: "Beef, rice, walnut, tkemali" }, "06:00"),
    d({ ka: "ჯონჯოლის სალათი", en: "Jonjoli Salad" }, { ka: "მწნილი, ხახვით", en: "Pickled, with onion" }, 150, 120, 3, 6, 12, ["fast", "gf"], [], { ka: "ჯონჯოლი, ხახვი, ზეთი", en: "Bladdernut, onion, oil" }, "05:30"),
  ],
  [
    d({ ka: "ხინკალი (6 ც.)", en: "Khinkali (6 pcs)" }, { ka: "მთიულური ხელით", en: "Hand-pleated, Mtiuleti" }, 360, 640, 34, 26, 66, ["classic", "protein"], ["gluten"], { ka: "ხორცი, ფქვილი, ხახვი, კვლიავი", en: "Beef & pork, flour, onion, cumin" }, "07:20"),
    d({ ka: "აჯაფსანდალი", en: "Ajapsandali" }, { ka: "ზაფხულის ბოსტნეული", en: "Summer vegetable stew" }, 330, 280, 6, 14, 30, ["fast", "gf"], [], { ka: "ბადრიჯანი, წიწაკა, პომიდორი, კარტოფილი", en: "Eggplant, pepper, tomato, potato" }, "06:15"),
  ],
  [
    d({ ka: "მწვადი ასორტი", en: "Mixed Grill Platter" }, { ka: "დღესასწაულის პარტია", en: "Holiday kitchen batch" }, 420, 690, 44, 38, 28, ["protein", "classic"], [], { ka: "ღორის მწვადი, ქათამი, ბოსტნეული", en: "Pork skewer, chicken, grilled vegetables" }, "07:00"),
    d({ ka: "ხაჭაპური ადჯარული", en: "Adjarian Khachapuri" }, { ka: "შაბათ-კვირის კლასიკა", en: "Weekend classic" }, 320, 720, 28, 42, 48, ["classic"], ["gluten", "dairy"], { ka: "ცომი, ყველი, კვერცხი, კარაქი", en: "Dough, cheese, egg, butter" }, "06:45"),
    d({ ka: "კომპოტი", en: "Seasonal Compote" }, { ka: "სახლის მეთოდი", en: "House method" }, 200, 90, 0, 0, 22, ["fast", "gf"], [], { ka: "ხილი, შაქარი, წყალი", en: "Fruit, sugar, water" }, "05:20"),
  ],
  [
    d({ ka: "საცივი", en: "Satsivi" }, { ka: "დღესასწაულის სუფრა", en: "Feast-day table" }, 360, 580, 36, 40, 18, ["protein", "classic"], ["nuts"], { ka: "ქათამი, ნიგოზი, სუნელები", en: "Chicken, walnut, spices" }, "06:10"),
    d({ ka: "გოზინაყი", en: "Gozinaki" }, { ka: "ტკბილი დახურვა", en: "Sweet close" }, 80, 310, 6, 18, 32, ["classic", "gf"], ["nuts"], { ka: "ნიგოზი, თაფლი", en: "Walnut, honey" }, "05:00"),
    d({ ka: "თონის პური", en: "Tone Bread" }, { ka: "ცხელი მიწოდება", en: "Hot dispatch" }, 180, 420, 14, 2, 84, ["fast"], ["gluten"], { ka: "ფქვილი, საფუარი, მარილი", en: "Flour, yeast, salt" }, "07:10"),
  ],
];

export const districts = ["Vake", "Saburtalo", "Mtatsminda", "Vera", "Didube", "Isani", "Nadzaladevi", "Krtsanisi"];

export const dict = {
  nav: { menu: { ka: "მენიუ", en: "Menu" }, calc: { ka: "კალკულატორი", en: "Calculator" } },
  badge: { ka: "გარეთ ატლასი • შიგნით ათასი", en: "Satin outside • A thousand within" },
  h1: { ka: "ქართული სუფრა, საათის სიზუსტით", en: "Georgian lunch, kitchen-clock precision" },
  sub: {
    ka: "ცხელი კორპორაციული სადილები თბილისში — კრაფტ შეფუთვაში, წუთის სიზუსტით.",
    en: "Hot corporate lunches across Tbilisi — kraft-packed, on the minute.",
  },
  cta1: { ka: "მოითხოვეთ სატესტო სადილი", en: "Request a Tasting Box" },
  cta2: { ka: "დღევანდელი მენიუ", en: "Today's Batch" },
  status: { ka: "სამზარეულო: პარტია #4 აქტიურია • 10:30 — ხვალინდელი ცვლილებების ბოლო ვადა", en: "Kitchen Status: Batch #4 Active • 10:30 AM Cutoff for Next-Day Alterations" },
  capacity: { ka: "დღეს დადასტურებული პორციები", en: "Portions Committed Today" },
  dispatch: { ka: "ყოველდღიური დისპეტჩერი", en: "The Daily Dispatch" },
  dayHint: {
    ka: "1–5 სამუშაო დღეები · 6–7 დასვენება / დღესასწაული — ვმუშაობთ ყველა დღეს.",
    en: "1–5 workdays · 6–7 weekend / holiday — we cook every day.",
  },
  calcTitle: { ka: "მოცულობის კალკულატორი", en: "Volume Calculator" },
  calcSub: {
    ka: "დაათვლეთ მოცულობა — დემო ტარიფები ოფისის გუნდებისთვის.",
    en: "Size the volume — demo rates for office teams.",
  },
  team: { ka: "გუნდის ზომა", en: "Team size" },
  freq: { ka: "სიხშირე", en: "Frequency" },
  f5: { ka: "5 დღე/კვირა", en: "5 days/week" },
  f3: { ka: "3 დღე/კვირა", en: "3 days/week" },
  fflex: { ka: "მოქნილი ცვლები", en: "Flexible shifts" },
  vat: { ka: "დღგ-ს ჩათვლით (18%)", en: "Include VAT (18%)" },
  unit: { ka: "ერთეულის ფასი", en: "Unit per employee" },
  food: { ka: "საკვები", en: "Food cost" },
  delivery: { ka: "თერმო-მიწოდება", en: "Temp-controlled delivery" },
  tax: { ka: "დღგ", en: "VAT" },
  total: { ka: "თვიური ჯამი", en: "Monthly total" },
  lead: { ka: "შეთავაზების მოთხოვნა", en: "Request a Proposal" },
};
