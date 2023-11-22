const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SCECRET_KEY);
import axios from "axios";
import { CheckoutSessionRequest, UserPremiumSubscribeRequest } from "../models/dto/requests/PaymentRequest";
import { paymentApiUrl } from "@/constant";

type PaymentStripe = {
   prize: string;
   quantity: number;
};


// ! This function is will not used, gonna remove it
export async function checkout(paymentDetails: PaymentStripe) {

   const session = await stripe.checkout.sessions.create({
      line_items: [
         {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: paymentDetails.prize,
            quantity: paymentDetails.quantity,
         },
      ],
      mode: 'payment',
      payment_method_types: ['card', 'promptpay'],
      success_url: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: window.location.origin
   });

   return session.url
}

// ! This function is will not used, gonna remove it
export async function checkoutSub(paymentDetails: PaymentStripe) {

   const session = await stripe.checkout.sessions.create({
      line_items: [
         {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: paymentDetails.prize,
            quantity: paymentDetails.quantity,
         },
      ],
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}?cancle={cancle}`
   });

   return session.url
}

//* ------------------ These functions will use instead ------------------ *//
export async function getCheckoutSessionUrl(checkoutSessionRequest: CheckoutSessionRequest) {

   // For test
   const apiUrl = `${paymentApiUrl}/subsctiption/get-url`
   

   try {
      const requestOption = {
         headers: {
            "Authorization": `Bearer ${localStorage.getItem("at")}`,
         },
      }

      const response = await axios.post(
         apiUrl,
         checkoutSessionRequest,
         requestOption
      );

      if (response.status != 201) {
         // TODO : Handle error
         // TODO logic to get new Access Token from Refresh Token
         // Some code..
         // Some code..
         // Some code..
      } else {
         return response.data.url;
      }

   } catch (error) {

      // TODO : Handle error
      // TODO logic to get new Access Token from Refresh Token
      // Some code..
      // Some code..
      // Some code..

      console.error(error);
   }
}

export async function userPremiumSubscribe(userPremiumSubscribeRequest: UserPremiumSubscribeRequest) {
   const apiUrl = `${paymentApiUrl}/payment-subscription`
   try {
      const requestOption = {
         headers: {
            "Authorization": `Bearer ${localStorage.getItem("at")}`,
         },
      }

      const response = await axios.post(
         apiUrl,
         userPremiumSubscribeRequest,
         requestOption
      );

      if (response.status != 201) {

         // TODO maybe return cancel subscription url
         // return response.data.cancel_url;
         console.log(response)
      }
      
         // TODO maybe return success subscription url
         // return response.data.success_url;

   } catch (error) {
      // TODO : Handle error
      // TODO logic to get new Access Token from Refresh Token
      // Some code..
      // Some code..
      // Some code..

      console.error(error);
   }
}