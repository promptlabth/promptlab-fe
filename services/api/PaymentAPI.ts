import { CheckoutSessionRequest, UserPremiumSubscribeRequest } from "@/models/types/dto/requests/PaymentRequest.type";
import axios from "axios";
import { paymentApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";

export async function apiGetCheckoutSessionUrl(
  checkoutSessionRequest: CheckoutSessionRequest,
) {
  const apiUrl = `${paymentApiUrl}/subscription/get-url`;
  try {
    const accessToken = await getAccessToken();
    const requestOption = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(
      apiUrl,
      checkoutSessionRequest,
      requestOption,
    );

    if (response.status != 201) {
      // TODO return failed payment url
      return;
    }
    return response.data.url;
  } catch (error) {
    // TODO : Handle error
    // TODO return failed payment url

    // Some code..
    // Some code..
    // Some code..

    console.error(error);
    return "";
  }
}

export async function apiCancelUserSubscribe() {
  const apiUrl = `${paymentApiUrl}/subscription/cancle`;
  try {
    const accessToken = await getAccessToken();
    const requestOption = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.delete(apiUrl, requestOption);

    if (response.status != 200) {
      // TODO return failed cancel subscription url

      return null;
    }

    return response.data;
  } catch (error) {
    // TODO : Handle error
    // TODO return failed cancel subscription url
    // Some code..
    // Some code..
    // Some code..

    console.error(error);
    return null;
  }
}

export async function apiUserPremiumSubscribe(
  userPremiumSubscribeRequest: UserPremiumSubscribeRequest,
) {
  const apiUrl = `${paymentApiUrl}/subscription/success`;
  try {
    const accessToken = await getAccessToken();
    const requestOption = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(
      apiUrl,
      userPremiumSubscribeRequest,
      requestOption,
    );

    if (response.status != 201) {
      // TODO maybe return cancel subscription url
      // return response.data.cancel_url;
    }

    return response.data;
  } catch (error) {
    // TODO : Handle error
    // TODO logic to get new Access Token from Refresh Token
    // Some code..
    // Some code..
    // Some code..

    console.error(error);
  }
}
