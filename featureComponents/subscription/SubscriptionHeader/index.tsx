import { SubscriptionHeaderProps } from "@/models/interfaces/SubscriptionHeader.interface";
import { subscriptionPlanColorMap } from "@/constants/color.constanst";
import { Container, Button } from "react-bootstrap";
import styles from "./SubscriptionHeader.module.css";
import { MdNewReleases } from "react-icons/md";
export const SubscriptionHeader = (props: SubscriptionHeaderProps) => {
  const { translate, user, handleSubscriptionPlanTypeChange, subscriptionPlanTypeIndex } = props;
  return (
    <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
      <div className="d-flex justify-content-center pb-5">
        <Button
          className={styles.subscription_selection_button}
          onClick={() => handleSubscriptionPlanTypeChange()}
          style={{color: subscriptionPlanTypeIndex === 0 ? "#00FFAB" : "white"}}
        >
          รายเดือน
        </Button>
        <div className="d-flex">
          <Button
            className={styles.subscription_selection_button}
            onClick={() => handleSubscriptionPlanTypeChange()}
          style={{color: subscriptionPlanTypeIndex === 1 ? "#00FFAB" : "white"}}
          >
            รายปี
          </Button>
          <div style={{ marginTop: "-0.5rem", marginLeft: "-1.5rem" }}>
            <MdNewReleases color="orange" />
          </div>
          <div className="ms-1 text-white" style={{ marginTop: "-0.5rem" }}>
            New
          </div>
        </div>
      </div>
      <figure className="text-center  text-light">
        <blockquote className="blockquote">
          <p className="display-4 fw-bold">{subscriptionPlanTypeIndex === 0 ? translate("subscription") : translate("subscriptionAnnual")}</p>
        </blockquote>
        <figcaption className="blockquote-footer"></figcaption>
      </figure>
      {user?.planType && (
        <div className="text-white text-center">
          <div className="fs-5">
            {" "}
            {translate("subscription.whatIsYourPlan")}{" "}
            <div
              style={{
                color: subscriptionPlanColorMap[user?.planType],
                display: "inline",
                fontWeight: "bold",
              }}
            >
              {user?.planType}
            </div>
          </div>
          <div className="fs-5">
            {" "}
            {translate("subscription.wantToChangePlan")}{" "}
            <u>isaman@promptlabai.com</u>
          </div>
        </div>
      )}
    </Container>
  );
};
