export const subscriptionPlanPrizeIdMap: {
  [key: string]: { planId: number; prizeId: string };
} = {
  FREE: { planId: 1, prizeId: "" },
  BRONZE: { planId: 2, prizeId: "price_1OLSgkAom1IgIvKK9c3qAqMT" },
  SILVER: { planId: 3, prizeId: "price_1OLShKAom1IgIvKKt8q5fCBI" },
  GOLD: { planId: 4, prizeId: "price_1OLSi0Aom1IgIvKKD24dXvtu" },
};

export const featureTitleIdMap: { [key: string]: number } = {
  "createSellingPost.title": 1,
  "createContents.title": 2,
  "createArticle.title": 3,
  "createScripts.title": 4,
  "createClickBait.title": 5,
};
