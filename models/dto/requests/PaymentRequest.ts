export type CheckoutSessionRequest = {
    PrizeID: string;
    WebUrl: string;
    PlanID: number
 }
 
export type UserPremiumSubscribeRequest = {
    CheckoutSessionId : string
}