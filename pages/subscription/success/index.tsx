
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { UserPremiumSubscribeRequest } from '@/models/dto/requests/PaymentRequest';
import { useUserContext } from '@/contexts/UserContext';
import { userPremiumSubscribe } from '@/api/Payments';
import { useRouter } from 'next/router';

export default function SubscriptionSuccessPage() {
    const userContext = useUserContext();
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const plan_id = searchParams.get('plan')
    const router = useRouter()
    // 
    // todo function handle success payment
    const handleSuccessPayment = async (session_id: string | null) => {
        // Check if session_id and plan_id are not null before proceeding
        if (session_id !== null) {
            const data: UserPremiumSubscribeRequest = {
                CheckoutSessionId: session_id,
            };

            const res = await userPremiumSubscribe(data)
            console.log(res)

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
        if (router.isReady) {
            const user_id = userContext?.user?.firebase_id
            console.log(session_id, plan_id, user_id)
            handleSuccessPayment(session_id)
        }
        return
    }, [router.isReady])


    return (
        <div>index {session_id}</div>
    )
}
