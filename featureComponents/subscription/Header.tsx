import { SubscriptionHeaderProps } from "@/models/interfaces/SubscriptionHeader.interface"
import { subscriptionPlanColorMap } from "@/constants/color.constanst";
import { Container } from "react-bootstrap";
export const Header = (props: SubscriptionHeaderProps) => {
  const { translate, user } = props
  return (
    <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
      <figure className="text-center  text-light">
        <blockquote className="blockquote">
          <p className="display-4 fw-bold">
            {translate("subscription")}
          </p>
        </blockquote>
        <figcaption className="blockquote-footer"></figcaption>
      </figure>
      {user?.planType  &&
        <div className="text-white text-center">
          <div className="fs-5"> {translate("subscription.whatIsYourPlan")}{" "}
            <div style={{
              color: subscriptionPlanColorMap[user?.planType],
              display: "inline",
              fontWeight: "bold"
            }}>
              {user?.planType}
            </div>
          </div>
          <div className="fs-5"> {translate("subscription.wantToChangePlan")}{" "}<u>isaman@promptlabai.com</u></div>
        </div>
      }
    </Container>
  )
}