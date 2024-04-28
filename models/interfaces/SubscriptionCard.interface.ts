import { TFunction } from "i18next";
export interface SubscriptionCardProps {
  translate: TFunction<"translation", undefined>;
  handleCheckoutSession: (prizeId: string, planId: number) => Promise<void>;  
  title?: string;
  price?: number;
  messageCount?: number;
  isRecommended?: boolean;
}
