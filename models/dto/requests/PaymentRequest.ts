export type CheckoutSessionRequest = {
    PrizeID: string;
    WebUrl: string;
    PlanID: number
 }
 
export type UserPremiumSubscribeRequest = {
    subscription_id : string
    user_id: string
    plan_id: string
}