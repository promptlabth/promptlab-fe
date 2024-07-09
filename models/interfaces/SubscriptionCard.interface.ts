import { TFunction } from "i18next";
export interface SubscriptionCardProps {
  translate: TFunction<"translation", undefined>;
  handleCheckoutSession: (prizeId: string, planId: number) => Promise<void>;
  mapKey: string;
  messageCount?: number;
  isRecommended?: boolean;
}
