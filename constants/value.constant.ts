export const subscriptionPlanPrizeIdMap: {
  [key: string]: { planId: number;  title: string; prizeId: string, price: number };
} = {
  FREE: { planId: 1, title: "FREE", prizeId: "", price: 0 },
  BRONZE: { planId: 2, title: "BRONZE", prizeId: "price_1OLSgkAom1IgIvKK9c3qAqMT", price: 59 },
  SILVER: { planId: 3, title: "SILVER", prizeId: "price_1OLShKAom1IgIvKKt8q5fCBI", price: 199 },
  GOLD: { planId: 4, title: "GOLD", prizeId: "price_1OLSi0Aom1IgIvKKD24dXvtu", price: 299 },
  BRONZE_ANNUAL: { planId: 2, title: "ANNUAL BRONZE", prizeId: "price_1PaHGZAom1IgIvKKyKmus1gZ", price: 599 },
  SILVER_ANNUAL: { planId: 3, title: "ANNUAL SILVER", prizeId: "price_1PaHNEAom1IgIvKKhpJ3bLvD", price: 1999 },
  GOLD_ANNUAL: { planId: 4, title: "ANNUAL GOLD", prizeId: "price_1PaHNfAom1IgIvKKj7GwPY0I", price: 2999 },
};

export const featureTitleIdMap: { [key: string]: number } = {
  "createSellingPost.title": 1,
  "createContents.title": 2,
  "createArticle.title": 3,
  "createScripts.title": 4,
  "createClickBait.title": 5,
};
