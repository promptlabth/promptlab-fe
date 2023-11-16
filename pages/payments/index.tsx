// import { checkout, checkoutSub } from '@/api/Payments';
import { useRouter } from 'next/navigation';
// import router from 'next/router';
import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
import { translate } from "@/languages/language";
import { useLanguage } from "@/contexts/LanguageContext";
import { BsCoin } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";
import { GiCoins } from "react-icons/gi";
import { GiTwoCoins } from "react-icons/gi";
import { RiCoinFill } from "react-icons/ri";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MaintainPage } from '@/components/maintain';
import { CheckoutSessionRequest } from '@/models/dto/requests/PaymentRequest';
import { getCheckoutSessionUrl } from '@/api/Payments';
// loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_API_KEY
// );

export default function Payment() {
  const router = useRouter();
  // const [selectedPrize, setSelectedPrize] = useState("");
  const { language } = useLanguage();

  // ! This function is will be deprecated soon
  // const handlePrizeClick = async (prize: string) => {
  //   // setSelectedPrize(prize);

  //   // Calling the checkout function and awaiting the returned URL
  //   const url= await checkout({ prize: prize, quantity: 1 });
  //   // Redirecting to the URL
  //   router.push(url);

  // };

  // ! This function is will be deprecated soon
  // const handlePrizeClickSub = async (prize: string) => {
  //   // setSelectedPrize(prize);

  //   // Calling the checkout function and awaiting the returned URL
  //   const url = await checkoutSub({ prize: prize, quantity: 1 });
  //   // Redirecting to the URL
  //   router.push(url);

  // };

  // // This function is soonly used to handle the checkout session 
  // const handleCheckoutSession = async (prize_id: string) => {
  //   const data : CheckoutSessionRequest = {
  //     prize_id: prize_id,
  //     web_url: window.location.hostname,
  //   }

  //   // Calling the checkout function and awaiting the returned Stripe checkout session URL
  //   const checkout_session_url = await getCheckoutSessionUrl(data);

  //   // TODO logic to store plan_id in website
  //   // Redirect to stripe payment page
  //   router.push(checkout_session_url); 
  // }

  return (
    <>
      <div className={noto_sans_thai.className}>
        <Container fluid={true}
          className="p-0 bg-dark pt-5 pb-5"
        // className={`${styles.payment_hide}`}
        >
          <Container className={`${styles.container}`}>
            <figure className="text-center pt-4 pb-4 text-light">
              <div className="pb-2">
                <BsCoin fontSize={96}></BsCoin>{" "}
              </div>
              <blockquote className="blockquote">
                <p className="display-4 fw-bold">
                  {translate("payment", language)}
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                {translate("payment.description_1", language)}
              </figcaption>
            </figure>
            <Container fluid={true} className={`${styles.page_payment_area}`}>
              <div className={`row ${styles.page_payment_row}`}>
                <div className="container text-center">
                  <Row className="mt-5">
                    <Col
                      className={`d-flex flex-column align-items-center ${styles.custom_border}`}
                    >
                      <h5 className="mb-3">
                        {translate("payment.coin_1", language)}
                      </h5>
                      <RiCoinFill fontSize={70} color={"yellow"}></RiCoinFill>
                      <button
                        className={`${styles.btn} btn mt-3`}
                        onClick={() => {}
                          // handlePrizeClick("price_1NdUDIAom1IgIvKKmDRjzFiC")
                        }
                      >
                        50
                      </button>
                    </Col>
                    <Col
                      className={`d-flex flex-column align-items-center ${styles.custom_border}`}
                    >
                      <h5 className="mb-3">
                        {translate("payment.coin_2", language)}
                      </h5>
                      <GiTwoCoins fontSize={70} color={"yellow"}></GiTwoCoins>
                      <button
                        className={`${styles.btn} btn mt-3`}
                        onClick={() => {}
                          // handlePrizeClick("price_1NdZOtAom1IgIvKK5pWX5HLN")
                        }
                      >
                        100
                      </button>
                    </Col>
                    <Col
                      className={`d-flex flex-column align-items-center ${styles.custom_border}`}
                    >
                      <h5 className="mb-3">
                        {translate("payment.coin_3", language)}
                      </h5>
                      <FaCoins fontSize={70} color={"yellow"}></FaCoins>
                      <button
                        className={`${styles.btn} btn mt-3`}
                        onClick={() => {}
                          // handlePrizeClick("price_1NdZPiAom1IgIvKKW9YdtmZQ")
                        }
                      >
                        200
                      </button>
                    </Col>
                    <Col
                      className={`d-flex flex-column align-items-center ${styles.custom_border}`}
                    >
                      <h5 className="mb-3">
                        {translate("payment.coin_4", language)}
                      </h5>
                      <GiCoins fontSize={70} color={"yellow"}></GiCoins>
                      <button
                        className={`${styles.btn} btn mt-3`}
                        onClick={() => {}
                          // handlePrizeClick("price_1NdZQTAom1IgIvKK0LMh6cgS")
                        }
                      >
                        300
                      </button>
                    </Col>
                    <Col
                      className={`d-flex flex-column align-items-center ${styles.custom_border}`}
                    >
                      <h5 className="mb-3">
                        subscription
                      </h5>
                      <GiCoins fontSize={70} color={"yellow"}></GiCoins>
                      <button
                        className={`${styles.btn} btn mt-3`}
                        onClick={() => {}
                          // handlePrizeClickSub("price_1O4Mh1Aom1IgIvKKt3Ul6HnJ")
                        }
                      >
                        subscription
                      </button>
                    </Col>
                    <p className={`${styles.select}`}>
                      {translate("payment.selectCoin", language)}
                    </p>
                  </Row>
                  {/* {selectedPrize && (
                    <div className="text-white mt-4">
                      <h3>Selected Prize: {selectedPrize}</h3>
                    </div>
                  )} */}
                </div>
              </div>
            </Container>
          </Container>
        </Container>
      </div>
    </>
  );
}
