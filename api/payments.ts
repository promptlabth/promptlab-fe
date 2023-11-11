const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SCECRET_KEY);
import axios from "axios";

type PaymentStripe = {
  prize: string;
  quantity: number;
};

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
    payment_method_types: ['card','promptpay'],
    success_url: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: window.location.origin
  });

  return session.url
}

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

export async function createPaymentIntent(foo : any) {
  try {

    // Api url
    const apiUrl = `https://url.com/payment-subscription`

    const data = {
      // TODO use the correct data
    }

    // POST request
    const response = await axios.post(apiUrl, {});

    return response.data
    
  } catch (e) { 

  }
}
