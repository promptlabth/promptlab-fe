import { CheckoutSessionRequest } from "@/models/types/dto/requests/PaymentRequest.type";
import axios from "axios";
import { paymentApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";

export async function getCheckoutSessionUrl( checkoutSessionRequest: CheckoutSessionRequest) {
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
      return;
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
    return "";
  }
}
