import { checkout, checkoutSub } from "@/api/payments";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
// import router from 'next/router';
import React, { useState } from "react";
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
import { MaintainPage } from "@/components/maintain";
// loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_API_KEY
// );
import { BsCheckCircle } from "react-icons/bs";
export default function Subscription() {
  const router = useRouter();
  const [selectedPrize, setSelectedPrize] = useState("");
  const { language } = useLanguage();
  const handlePrizeClick = async (prize: string) => {
    setSelectedPrize(prize);

    // Calling the checkout function and awaiting the returned URL
    const url = await checkout({ prize: prize, quantity: 1 });
    // Redirecting to the URL
    router.push(url);
  };

  const handlePrizeClickSub = async (prize: string) => {
    setSelectedPrize(prize);

    // Calling the checkout function and awaiting the returned URL
    const url = await checkoutSub({ prize: prize, quantity: 1 });
    // Redirecting to the URL
    router.push(url);
  };

  return (
    <>
      <div className={noto_sans_thai.className}>
        <Container
          fluid={true}
          className="p-0 bg-dark pt-5 pb-5"
          // className={`${styles.payment_hide}`}
        >
          <Container className={`${styles.container}`}>
            <figure className="text-center  text-light">
              {/* <div className="pb-2">
                <BsCoin fontSize={96}></BsCoin>{" "}
              </div> */}
              <blockquote className="blockquote">
                <p className="display-4 fw-bold">
                  {translate("subscription", language)}
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                {/* {translate("payment.description_1", language)} */}
              </figcaption>
            </figure>
            <div className={`row ${styles.page_payment_row}`}>
              <div className="container text-center">
                <Row className="">
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.freeBorder}`}
                  >
                    <h5 className="mb-3">
                      {/* {translate("payment.coin_1", language)} */}
                      FREE
                    </h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(0deg, #00FFAB 0%, #00AA95 100%)",
                      }}
                    >
                      0
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          5 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.community", language)}
                        </small>
                      </Row>
                    </div>
                    <button
                      className={`${styles.btn} ${styles.free} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(0deg, #00FFAB 0%, #00AA95 100%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handlePrizeClick("price_1NdUDIAom1IgIvKKmDRjzFiC")
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.broneBorder}`}
                  >
                    <h5 className="mb-3">
                      {/* {translate("payment.coin_2", language)} */}
                      BRONZE
                    </h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #C06B16 -18.83%, #D99C71 100%)",
                      }}
                    >
                      50
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
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
                          {translate("subscription.chat", language)}
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
                    <button
                      className={`${styles.btn} ${styles.bronze} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(180deg, #C06B16 -18.83%, #D99C71 100%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handlePrizeClick("price_1NdZOtAom1IgIvKK5pWX5HLN")
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.silverBorder}`}
                  >
                    <h5 className="mb-3">
                      {/* {translate("payment.coin_3", language)} */}
                      SILVER
                    </h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(0deg, #CACACA 0%, #676767 100%)",
                      }}
                    >
                      100
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          100 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)}
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
                    <button
                      className={`${styles.btn} ${styles.silver} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(0deg, #CACACA 0%, #676767 100%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handlePrizeClick("price_1NdZPiAom1IgIvKKW9YdtmZQ")
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.goldBorder}`}
                  >
                    <h5 className="mb-3">
                      {/* {translate("payment.coin_4", language)} */}
                      GOLD
                    </h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #EE8F00 0%, #FFCA43 57.92%)",
                      }}
                    >
                      200
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          500 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)}
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
                    <button
                      className={`${styles.btn} ${styles.gold} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(180deg, #EE8F00 0%, #FFCA43 57.92%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handlePrizeClick("price_1NdZQTAom1IgIvKK0LMh6cgS")
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  {/* <Col
                    className={`d-flex flex-column align-items-center ${styles.custom_border}`}
                  >
                    <h5 className="mb-3">subscription</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(270deg, #00FFAB -14.04%, #00AA95 100%)",
                      }}
                    >
                      200฿
                    </h1>
                    <button
                      className={`${styles.btn} btn mt-3`}
                      onClick={() =>
                        handlePrizeClickSub("price_1O4Mh1Aom1IgIvKKt3Ul6HnJ")
                      }
                    >
                      subscription
                    </button>
                  </Col> */}
                  <p className={`${styles.select}`}>
                    {translate("subscription.selectSub", language)}
                  </p>
                </Row>
                {selectedPrize && (
                  <div className="text-white mt-4">
                    <h3>Selected Prize: {selectedPrize}</h3>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </>
  );
}
