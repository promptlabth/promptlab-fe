import { CheckoutSessionRequest } from "@/models/types/dto/requests/PaymentRequest.type";
import { paymentApi, buildAuthRequestOptions } from "./ApiClient";

export async function apiGetCheckoutSessionUrl(
  checkoutSessionRequest: CheckoutSessionRequest,
) {
  try {
    const response = await paymentApi.post(
      "/subscription/get-url",
      checkoutSessionRequest,
      await buildAuthRequestOptions(),
    );

    if (response.status != 201) {
      // TODO return failed payment url
      return;
    }
    return response.data.url;
  } catch (error) {
    // TODO : Handle error
    // TODO return failed payment url
    console.error(error);
    return "";
  }
}

export async function apiCancelUserSubscribe() {
  try {
    const response = await paymentApi.delete(
      "/subscription/cancle",
      await buildAuthRequestOptions(),
    );

    if (response.status != 200) {
      // TODO return failed cancel subscription url
      return null;
    }

    return response.data;
  } catch (error) {
    // TODO : Handle error
    // TODO return failed cancel subscription url
    console.error(error);
    return null;
  }
}

// NOTE: plan activation after a successful checkout is handled by the payment
// service's Stripe webhook (ms-payments POST /webhook -> webhook_controller.go,
// which sets the user's PlanID/Sub_date on customer.subscription.created/updated
// and payment_intent.succeeded), so the frontend makes no "subscription success"
// call. The removed apiUserPremiumSubscribe posted to /subscription/success,
// a route that has never existed in ms-payments (verified against the full git
// history of promptlabth/ms-payments and its deployed Cloud Run main branch);
// the call always 404'd, its error was swallowed, and the page never received
// a session_id prop, so removing it cannot affect activation.
