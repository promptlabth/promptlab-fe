import Row from "react-bootstrap/Row";
import styles from "./SubscriptionList.module.css";
import { TFunction } from "i18next";
import { SubscriptionCard } from "../SubscriptionCard";
import { Container } from "react-bootstrap";
import { subscriptionPlanPrizeIdMap } from "@/constants/value.constant";
interface SubscriptionListProps {
  translate: TFunction<"translation", undefined>;
  handleCheckoutSession: (prizeId: string, planId: number) => Promise<void>;
  subscriptionPlanTypeIndex : number
}

export const SubscriptionList = (props: SubscriptionListProps) => {
  const { translate, handleCheckoutSession, subscriptionPlanTypeIndex } = props;
  return (
    <div className={styles.container}>
      <Container>
        <div className={`row ${styles.page_payment_row}`}>
          <div className={`container text-center`}>
            <Row className={`row ${styles.subscription_list_grid}`}>
              <SubscriptionCard
                translate={translate}
                mapKey={"FREE"}
                messageCount={60}
                isRecommended={false}
                handleCheckoutSession={handleCheckoutSession}
              />
              <SubscriptionCard
                translate={translate}
                mapKey={subscriptionPlanTypeIndex === 0 ? "BRONZE" : "BRONZE_ANNUAL"}
                messageCount={300}
                isRecommended={false}
                handleCheckoutSession={handleCheckoutSession}
              />
              <SubscriptionCard
                translate={translate}
                mapKey={subscriptionPlanTypeIndex === 0 ? "SILVER" : "SILVER_ANNUAL"}
                messageCount={1500}
                isRecommended={true}
                handleCheckoutSession={handleCheckoutSession}
              />
              <SubscriptionCard
                translate={translate}
                mapKey={subscriptionPlanTypeIndex === 0 ? "GOLD" : "GOLD_ANNUAL"}
                messageCount={3000}
                isRecommended={false}
                handleCheckoutSession={handleCheckoutSession}
              />
              </Row>
              <p className={`${styles.select} text-center`}>
              {translate("subscription.selectSub")}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}