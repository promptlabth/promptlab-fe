import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Col";
import styles from "./SubscriptionCard.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { SubscriptionCardProps } from "@/models/interfaces/SubscriptionCard.interface";
import { subscriptionPlanCardColorMap } from "@/constants/color.constanst";
import { subscriptionPlanPrizeIdMap } from "@/constants/value.constant";
import { MdOutlineRecommend } from "react-icons/md";

export const SubscriptionCard = (props: SubscriptionCardProps) => {
  const { translate, title, price, messageCount, handleCheckoutSession, isRecommended } = props;

  const borderColor = isRecommended ? styles.recommended_plan_border :
    title === "FREE" ? styles.freeBorder :
    title === "BRONZE" ? styles.bronzeBorder :
    title === "SILVER" ? styles.silverBorder :
    title === "GOLD" ? styles.goldBorder :
      styles.freeBorder;

  const buttonClass = title === "FREE" ? styles.free :
    title === "BRONZE" ? styles.bronze :
    title === "SILVER" ? styles.silver :
    title === "GOLD" ? styles.gold :
      styles.free

  return (
    <Col className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${borderColor}`}>
      {isRecommended &&
        <div className="w-100 d-flex justify-content-end" >
          <div className="user-select-none text-white fs-5 ps-2 pe-2" style={{ position: "absolute", right: "-1.25rem", top: "-1.25rem", backgroundColor: "red", borderRadius: "8px" }}>
            <MdOutlineRecommend size={25} /> Recommend
          </div>
        </div>
      }
      <h5 className="mb-3">{title}</h5>
      <h1
        className={`${styles.circle_background}`}
        style={{ background: subscriptionPlanCardColorMap[title!], }}
      >
        {price}
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
            {messageCount} {translate("subscription.message")}
          </small>
        </Row>
        <Row>
          <small>
            <BsCheckCircle
              size={16}
              className="me-2"
            ></BsCheckCircle>
            {translate("subscription.community")}
          </small>
        </Row>
      </div>
      {title !== "FREE" &&
        <button
          className={`${styles.btn} ${buttonClass} btn position-absolute`}
          style={{
            background: subscriptionPlanCardColorMap[title!],
            bottom: -30,
          }}
          onClick={() => handleCheckoutSession(subscriptionPlanPrizeIdMap[title!].prizeId, subscriptionPlanPrizeIdMap[title!].planId)}
        >
          {translate("subscription.buy")}
        </button>
      }
    </Col>
  )
}