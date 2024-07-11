import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Col";
import styles from "./SubscriptionCard.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { SubscriptionCardProps } from "@/models/interfaces/SubscriptionCard.interface";
import { subscriptionPlanCardColorMap } from "@/constants/color.constanst";
import { subscriptionPlanPrizeIdMap } from "@/constants/value.constant";
import { MdOutlineRecommend } from "react-icons/md";
import { formatNumber } from "@/utils/number";
export const SubscriptionCard = (props: SubscriptionCardProps) => {
  const { translate, mapKey, messageCount, handleCheckoutSession, isRecommended, isAnnual } = props;

  const borderColor = isRecommended ? styles.recommended_plan_border :
    mapKey === "FREE" || mapKey === "FREE_ANNUAL" ? styles.freeBorder :
    mapKey === "BRONZE" || mapKey === "BRONZE_ANNUAL" ? styles.bronzeBorder :
    mapKey === "SILVER" || mapKey === "SILVER_ANNUAL" ? styles.silverBorder :
    mapKey === "GOLD" || mapKey === "GOLD_ANNUAL" ? styles.goldBorder :
      styles.freeBorder;

  const buttonClass = mapKey === "FREE" || mapKey === "FREE_ANNUAL" ? styles.free :
    mapKey === "BRONZE" || mapKey === "BRONZE_ANNUAL" ? styles.bronze :
    mapKey === "SILVER" || mapKey === "SILVER_ANNUAL" ? styles.silver :
    mapKey === "GOLD" || mapKey === "GOLD_ANNUAL" ? styles.gold :
      styles.free

  const formattedPrice = formatNumber(subscriptionPlanPrizeIdMap[mapKey!].price);
  return (
    <Col className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${borderColor}`}>
      {isRecommended &&
        <div className="w-100 d-flex justify-content-end" >
          <div className="user-select-none text-white fs-5 ps-2 pe-2" style={{ position: "absolute", right: "-1.25rem", top: "-1.25rem", backgroundColor: "red", borderRadius: "8px" }}>
            <MdOutlineRecommend size={25} /> {translate("subscription.recommend")}
          </div>
        </div>
      }
      <h5 className="mb-3">{subscriptionPlanPrizeIdMap[mapKey!].title}</h5>
      <h1
        className={`${styles.circle_background}`}
        style={{ background: subscriptionPlanCardColorMap[mapKey!], }}
      >
        {formattedPrice}
        <span style={{ fontWeight: "normal", fontSize: "26px" }}>
          ฿
        </span>
      </h1>
      <div className="mt-4 mb-4 text-start">
        {isAnnual &&
          <Row>
            <small>
              <BsCheckCircle
                size={16}
                className="me-2"
              ></BsCheckCircle>
              {translate("subscription.annualMembership")}
            </small>
          </Row>
        }
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
      {mapKey !== "FREE" &&
        <button
          className={`${styles.btn} ${buttonClass} btn position-absolute`}
          style={{
            background: subscriptionPlanCardColorMap[mapKey!],
            bottom: -30,
          }}
          onClick={() => handleCheckoutSession(subscriptionPlanPrizeIdMap[mapKey!].prizeId, subscriptionPlanPrizeIdMap[mapKey!].planId)}
        >
          {translate("subscription.buy")}
        </button>
      }
    </Col>
  )
}