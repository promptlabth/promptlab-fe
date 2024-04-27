import Row from "react-bootstrap/Row";
import styles from "./SubscriptionList.module.css";
import { TFunction } from "i18next";
import { SubscriptionCard } from "../SubscriptionCard";
import { Container } from "react-bootstrap";
interface SubscriptionListProps {
  translate: TFunction<"translation", undefined>;
  handleCheckoutSession: (prizeId: string, planId: number) => Promise<void>;
}

export const SubscriptionList = (props: SubscriptionListProps) => {
  const { translate, handleCheckoutSession } = props;
  return (
    <div className={styles.container}>
      <Container >
        <div className={`row ${styles.page_payment_row}`}>
          <div className="container text-center">
            <Row>
              <SubscriptionCard
                translate={translate}
                title="FREE"
                price={0}
                messageCount={60}
                isRecommended={false}
                handleCheckoutSession={handleCheckoutSession}
              />
              <SubscriptionCard
                translate={translate}
                title="BRONZE"
                price={59}
                messageCount={300}
                isRecommended={false}
                handleCheckoutSession={handleCheckoutSession}
              />
              <SubscriptionCard
                translate={translate}
                title="SILVER"
                price={199}
                messageCount={1500}
                isRecommended={true}
                handleCheckoutSession={handleCheckoutSession}
              />
              <SubscriptionCard
                translate={translate}
                title="GOLD"
                price={299}
                messageCount={3000}
                isRecommended={false}
                handleCheckoutSession={handleCheckoutSession}
              />
            </Row>
            <p className={`${styles.select}`}>
              {translate("subscription.selectSub")}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}