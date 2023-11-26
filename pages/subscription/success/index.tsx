
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { UserPremiumSubscribeRequest } from '@/models/dto/requests/PaymentRequest';
import { useUserContext } from '@/contexts/UserContext';
import { userPremiumSubscribe } from '@/api/Payments';
import { useRouter } from 'next/router';
import { FaCheckCircle } from "react-icons/fa";
import styles from "./styles.module.css";
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from "@/languages/language";
import { BsCheckCircle } from 'react-icons/bs';
import { Row } from 'react-bootstrap';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'; // import plugin
dayjs.extend(utc); // Extend dayjs with the utc plugin


export default function SubscriptionSuccessPage() {
   const userContext = useUserContext();
   const [starDate, setStartDate] = React.useState<Date | null>(null);
   const [endDate, setEndDate] = React.useState<Date | null>(null);
   const { language } = useLanguage();
   const searchParams = useSearchParams()
   const session_id = searchParams.get('session_id')
   const plan_id = searchParams.get('plan')
   const router = useRouter()

   // Create map of plan type to cost with key of string and value of number
   const planCostMap: { [key: string]: number } = {
      'Bronze': 50,
      'Silver': 100,
      'Gold': 100,
   };

   // todo function handle success payment
   const handleSuccessPayment = async (session_id: string | null) => {
      // Check if session_id and plan_id are not null before proceeding
      if (session_id !== null) {
         const data: UserPremiumSubscribeRequest = {
            CheckoutSessionId: session_id,
         };

         const res = await userPremiumSubscribe(data)

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

         setStartDate(dayjs(userContext?.user?.start_date).utcOffset(7).toDate())
         setEndDate(dayjs(userContext?.user?.end_date).utcOffset(7).toDate())

      }

   }, [router.isReady])


   return (
      <div className="d-flex justify-content-center bg-dark h-full w-full">
         <div className={`text-white text-center ${styles.subscription_success_container}`}>
            <FaCheckCircle className="text-success mb-4" size={120} />
            <h1 className="fw-bold text-success">{translate("subscription.successText", language)}</h1>
            <h5>{translate("subscription.success.description", language)}</h5>
            <h5>{translate("subscription.detail.header", language)}</h5>
            <div className={`${styles.subscription_success_bg}`}>
               <div className="d-flex justify-content-between p-2 ps-3">
                  <div className="d-flex">
                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 28 28" fill="none">
                        {userContext?.user?.planType! === "Gold" && <circle cx="14" cy="14" r="14" fill="#FFB800" />}
                        {userContext?.user?.planType! === "Silver" && <circle cx="14" cy="14" r="14" fill="#A3A3A3" />}
                        {userContext?.user?.planType! === "Bronze" && <circle cx="14" cy="14" r="14" fill="#CD7F32" />}
                     </svg>
                     <h4 
                        className="ps-1 fw-bold"
                        style={{ color: userContext?.user?.planType! === "Gold" ? "#FFB800" : userContext?.user?.planType! === "Silver" ? "#A3A3A3" : "#CD7F32"}}
                     > {userContext?.user?.planType} </h4>
                  </div>
                  <h4 className="pe-2">ราคา: {planCostMap[userContext?.user?.planType!]} ฿</h4>
               </div>
               <div className="ps-3 d-flex justify-content-evenly">
                  <div> วันที่เริ่ม: </div>
                  {dayjs(starDate).format("DD MMMM YYYY HH:mm:ss")}
               </div>
               <div className="d-flex justify-content-evenly">
                  <div> วันที่สิ้นสุด: </div>
                  {dayjs(endDate).format("DD MMMM YYYY HH:mm:ss")}

               </div>
               <hr></hr>
               <div className="text-start ps-3"> แพลนนี้มีอะไรบ้าง </div>
               <div className="text-start pt-2 ps-4 pb-3">
                  <Row>
                     <small>
                        <BsCheckCircle
                           size={16}
                           className="me-3"
                        ></BsCheckCircle>
                        25 {translate("subscription.message", language)}
                     </small>
                  </Row>
                  <Row>
                     <small>
                        <BsCheckCircle
                           size={16}
                           className="me-3"
                        ></BsCheckCircle>
                        {translate("subscription.chat", language)} &#40;Coming Soon&#41;
                     </small>
                  </Row>
                  <Row>
                     <small>
                        <BsCheckCircle
                           size={16}
                           className="me-3"
                        ></BsCheckCircle>
                        {translate("subscription.support", language)}
                     </small>
                  </Row>
               </div>
            </div>
            <div className="d-flex justify-content-center">
               <button className={`${styles.back_button}`} onClick={() => router.push('/')}>{translate("button.back", language)}</button>
            </div>
         </div>
      </div>
   )
}
