
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import {UserPremiumSubscribeRequest} from '@/models/dto/requests/PaymentRequest';
import { useUserContext } from '@/contexts/UserContext';
import { userPremiumSubscribe } from '@/api/Payments';

export default function SubscriptionSuccessPage() {
    const userContext = useUserContext();
    const searchParams = useSearchParams()
// 
    // todo function handle success payment
    const handleSuccessPayment = (session_id: string | null, plan_id: string | null) => {
        // Check if session_id and plan_id are not null before proceeding
        if (session_id !== null && plan_id !== null && userContext?.user?.firebase_id) {
            const data: UserPremiumSubscribeRequest = {
                subscription_id: session_id,
                user_id: userContext.user.firebase_id,
                plan_id: plan_id,
            };

            userPremiumSubscribe(data)
    
            // Now you can use the 'data' object as needed
            // ...
        } else {
            // Handle the case where session_id, plan_id, or user_id is null
            console.error('Invalid session_id, plan_id, or user_id');
            // console.log(session_id, plan_id, userContext?.user?.firebase_id)
        }
    };
    

    // todo function handle error payment

    useEffect(() => {

        const session_id = searchParams.get('session_id')
        const plan_id = searchParams.get('plan')
        const user_id = userContext?.user?.firebase_id  
        console.log(session_id, plan_id, user_id)

        handleSuccessPayment(session_id, plan_id)

        
    })
    

  return (
    <div>index</div>
  )
}
