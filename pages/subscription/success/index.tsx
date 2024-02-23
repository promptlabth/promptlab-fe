
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { UserPremiumSubscribeRequest } from '@/models/dto/requests/PaymentRequest';
import { useUserContext } from '@/contexts/UserContext';
import { userPremiumSubscribe } from '@/api/Payments';
import { useRouter } from 'next/router';
import styles from "./styles.module.css";
import { BsCheckCircle } from 'react-icons/bs';
import { Row } from 'react-bootstrap';
import { FaSmileBeam } from "react-icons/fa";
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
export default function SubscriptionSuccessPage() {
   const userContext = useUserContext();
   const startDate = userContext?.user?.start_date
   const endDate = userContext?.user?.end_date
   const searchParams = useSearchParams()
   const session_id = searchParams.get('session_id')
   const { t, i18n } = useTranslation();
   const router = useRouter()
   // Create map of plan type to cost with key of string and value of number
   const planCostMap: { [key: string]: number } = {
      'Bronze': 59,
      'Silver': 199,
      'Gold': 299,
   };

   // todo function handle success payment
   const handleSuccessPayment = async (session_id: string | null) => {
      // Check if session_id and plan_id are not null before proceeding
      if (session_id !== null) {
         const data: UserPremiumSubscribeRequest = {
            CheckoutSessionId: session_id,
         };

         const result = await userPremiumSubscribe(data)
         console.log("Result from payment is",result)
         await userContext?.updateRemainingMessage()

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
         handleSuccessPayment(session_id)
      }
   }, [router.isReady])


   return (
      <>
         <Head>
            <title>{t("subsciption.success.header",)}</title>
            <meta name="description" content="A generated messages history" />
         </Head>
         <div className="d-flex justify-content-center bg-dark h-full w-full">
            <div className={`text-white text-center ${styles.subscription_success_container}`}>
               {/* <FaCheckCircle className="text-success mb-4" size={120} /> */}
               <FaSmileBeam className="text-success mb-4" size={120} />
               <h1 className="fw-bold text-success">{t("subscription.successText", )}</h1>
               <h5>{t("subscription.success.description", )}</h5>
               <h5>{t("subscription.detail.header", )}</h5>
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
                           style={{ color: userContext?.user?.planType! === "Gold" ? "#FFB800" : userContext?.user?.planType! === "Silver" ? "#A3A3A3" : "#CD7F32" }}
                        > {userContext?.user?.planType} </h4>
                     </div>
                     <h4 className="pe-2">{t("subscription.detail.price")}: {planCostMap[userContext?.user?.planType!]} ฿</h4>
                  </div>
                  <div className="px-4 d-flex justify-content-evenly">
                     <div> {t("subscription.detail.startDate")}: </div>
                     {startDate?.toString()}
                  </div>
                  <div className="px-4 d-flex justify-content-evenly">
                     <div> {t("subscription.detail.endDate")}: </div>
                     {endDate?.toString()}

                  </div>
                  <hr></hr>
                  <div className="text-start ps-3"> {t("profile.subsciption.planDetail")} </div>
                  <div className="text-start pt-2 ps-4 pb-3">
                     <Row>
                        <small>
                           <BsCheckCircle
                              size={16}
                              className="me-3"
                           ></BsCheckCircle>
                           {userContext?.user?.maxMessages} {t("subscription.message")}
                        </small>
                     </Row>
                     <Row>
                        <small>
                           <BsCheckCircle
                              size={16}
                              className="me-3"
                           ></BsCheckCircle>
                           {t("subscription.chat")} &#40;Coming Soon&#41;
                        </small>
                     </Row>
                     <Row>
                        <small>
                           <BsCheckCircle
                              size={16}
                              className="me-3"
                           ></BsCheckCircle>
                           {t("subscription.support")}
                        </small>
                     </Row>
                  </div>
               </div>
               <div className="d-flex justify-content-center">
                  <button className={`${styles.back_button}`} onClick={() => router.push('/')}>{t("button.back")}</button>
               </div>
            </div>
         </div>
      </>
   )
}

export const getServerSideProps = async ({ locale }: any) => ({
   props: {
       ...(await serverSideTranslations(locale, ['common']))
   }
});
