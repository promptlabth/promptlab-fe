export type Plan = {
    id: number;
    plan_type: string;
    datetime: Date;
 }
 
 export type Coin = {
    id: number;
    total: number;
 }
 
export type PaymentMethod = {
    id: number;
    type: string;
}
export type PaymentSubscriptionRequest = {
    payment_intent_id: string;
    user_id?: number;
    payment_method_id?: number;
    plan_id?: number;
}

export type PaymentSubscription = {
    id: number;
    payment_intent_id: string;
    datetime: Date;
    start_datetime: Date;
    end_datetime: Date;
    subscription_status: string;
    user_id?: number;
    payment_method_id?: number;
    plan_id?: number;
}