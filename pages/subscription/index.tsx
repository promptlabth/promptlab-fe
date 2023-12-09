import { getCheckoutSessionUrl } from "@/api/Payments";
import { useRouter } from "next/navigation";
import React from "react";
import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
import { translate } from "@/languages/language";
import { useLanguage } from "@/contexts/LanguageContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsCheckCircle } from "react-icons/bs";
import { CheckoutSessionRequest } from "@/models/dto/requests/PaymentRequest";
import { useUserContext } from "@/contexts/UserContext";
import { subscriptionPlanColorMap } from "@/constant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Subscription() {
  const userContext = useUserContext();
  const router = useRouter();
  const { language } = useLanguage();
  const prizeBronzeId = "price_1OL65UAom1IgIvKKzJK7unnC";
  const prizeSilverId = "price_1OL63sAom1IgIvKKgmy5sZRC";
  const prizeGoldId = "price_1OL65sAom1IgIvKKvqxaLRZu";

  const subscriptionPriorityMap: { [key: string]: number } = {
    "Free": 1,
    "Bronze": 2,
    "Silver": 3,
    "Gold": 4,
  };


  const handleSubscriptionPriority = (planId: number): boolean => {
    if (subscriptionPriorityMap[userContext?.user?.planType!] == planId) {

      toast.warn(translate("subscription.failed.clickCurrentPlan", language));
      return false
    } else if (subscriptionPriorityMap[userContext?.user?.planType!] > planId) {
      toast.error(translate("subscription.failed.clickLowerPlan", language));
      return false
    }
    return true;
  }

  // This function is soonly used to handle the checkout session 
  const handleCheckoutSession = async (prizeId: string, planId: number) => {
    const isValidtoSubscribe = handleSubscriptionPriority(planId);
    if (!isValidtoSubscribe) {
      return
    }
    const data: CheckoutSessionRequest = {
      PrizeID: prizeId,
      WebUrl: window.location.origin,
      PlanID: planId
    }

    // Calling the checkout function and awaiting the returned Stripe checkout session URL
    const checkoutSessionUrl = await getCheckoutSessionUrl(data);
    router.push(checkoutSessionUrl);
  }


  return (
    <>
      <div className={noto_sans_thai.className}>
        <ToastContainer style={{
          fontFamily: "Noto Sans Thai",
        }}/>
        <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
          <Container className={`${styles.container}`}>


            <figure className="text-center  text-light">
              <blockquote className="blockquote">
                <p className="display-4 fw-bold">
                  {translate("subscription", language)}
                </p>
              </blockquote>
              <figcaption className="blockquote-footer"></figcaption>
            </figure>
            {/*  */}
            {userContext?.user?.planType !== "Free" &&
              <div className="text-white text-center">
                <div className="fs-5"> ตอนนี้แพลนสมาชิกของคุณคือ{" "}
                  <div style={{
                    color: subscriptionPlanColorMap[userContext?.user?.planType!],
                    display: "inline",
                    fontWeight: "bold"
                  }}>
                    {userContext?.user?.planType}
                  </div>
                </div>
                <div className="fs-5"> ถ้าอยากอัพเกรดแพลน สามารถเลือกแพลนที่ระดับสูงกว่าได้เลย</div>
              </div>
            }

            <div className={`row ${styles.page_payment_row}`}>
              <div className="container text-center">
                <Row className="">
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.freeBorder}`}
                  >
                    <h5 className="mb-3">FREE</h5>
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
                            className="me-2"
                          ></BsCheckCircle>
                          60 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          {translate("subscription.community", language)}
                        </small>
                      </Row>
                    </div>
                    {/* <button
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
                    </button> */}
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.broneBorder}`}
                  >
                    <h5 className="mb-3">BRONZE</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #C06B16 -18.83%, #D99C71 100%)",
                      }}
                    >
                      59
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          300 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)} &#40;Coming Soon&#41;
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          {translate("subscription.support", language)}
                        </small>
                      </Row>
                    </div>
                    <button
                      className={`${styles.btn} ${styles.bronze} btn position-absolute`}
                      style={{
                        background: "linear-gradient(180deg, #C06B16 -18.83%, #D99C71 100%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handleCheckoutSession(prizeBronzeId, 2)
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.silverBorder}`}
                  >
                    <h5 className="mb-3">SILVER</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(0deg, #CACACA 0%, #676767 100%)",
                      }}
                    >
                      199
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          1500 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)} &#40;Coming Soon&#41;
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
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
                        handleCheckoutSession(prizeSilverId, 3)
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.goldBorder}`}
                  >
                    <h5 className="mb-3">GOLD</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #EE8F00 0%, #FFCA43 57.92%)",
                      }}
                    >
                      299
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          3000 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)} &#40;Coming Soon&#41;
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-2"
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
                        handleCheckoutSession(prizeGoldId, 4)
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <p className={`${styles.select}`}>
                    {translate("subscription.selectSub", language)}
                  </p>
                </Row>
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </>
  );
}
