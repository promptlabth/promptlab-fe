export type CheckoutSessionRequest = {
    PrizeID: string;
    WebUrl: string;
    PlanID: number
 }
 
export type UserPremiumSubscribeRequest = {
    checkout_session_id: string;
    plan_id: string
}