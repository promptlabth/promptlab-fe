const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SCECRET_KEY);
import axios from "axios";
import { CheckoutSessionRequest, UserPremiumSubscribeRequest } from "../models/dto/requests/PaymentRequest";
import { paymentApiUrl } from "@/constant";
import { GetAccessToken } from "./auth/auth_get_token";

type PaymentStripe = {
   prize: string;
   quantity: number;
};

//* ------------------ These functions will use instead ------------------ *//
export async function getCheckoutSessionUrl(checkoutSessionRequest: CheckoutSessionRequest) {

   // For test
   const apiUrl = `${paymentApiUrl}/subscription/get-url`
   

   try {
      let accessToken = await GetAccessToken()
      const requestOption = {
         headers: {
            "Authorization": `Bearer ${accessToken}`,
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
         return 
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
   const apiUrl = `${paymentApiUrl}/subscription/success`
   try {
      let accessToken = await GetAccessToken()
      const requestOption = {
         headers: {
            "Authorization": `Bearer ${accessToken}`,
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
         return response.data

   } catch (error) {
      // TODO : Handle error
      // TODO logic to get new Access Token from Refresh Token
      // Some code..
      // Some code..
      // Some code..

      console.error(error);
   }
}