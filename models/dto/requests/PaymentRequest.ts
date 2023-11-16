export type CheckoutSessionRequest = {
    prize_id: string;
    web_url: string;
 }
 
export type UserPremiumSubscribeRequest = {
    checkout_session_id: string;
    plan_id: string
}