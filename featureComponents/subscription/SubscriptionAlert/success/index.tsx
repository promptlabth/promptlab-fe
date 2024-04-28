import { FaSmileBeam } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { Row } from "react-bootstrap";
import Head from "next/head";
import styles from "./success.module.css";

export function SubscriptionSuccessPresentation({
  planType,
  t,
  handleBack,
  userContext,
}: any) {
  const startDate = userContext?.user?.start_date;
  const endDate = userContext?.user?.end_date;

  return (
    <>
      <Head>
        <title>{t("subsciption.success.header")}</title>
        <meta name="description" content="A generated messages history" />
      </Head>
      <div className="d-flex justify-content-center bg-dark h-full w-full">
        <div
          className={`text-white text-center ${styles.subscription_success_container}`}
        >
          <FaSmileBeam className="text-success mb-4" size={120} />
          <h1 className="fw-bold text-success">
            {t("subscription.successText")}
          </h1>
          <h5>{t("subscription.success.description")}</h5>
          <h5>{t("subscription.detail.header")}</h5>
          <div className={`${styles.subscription_success_bg}`}>
            <div className="d-flex justify-content-between p-2 ps-3">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  {planType === "Gold" && (
                    <circle cx="14" cy="14" r="14" fill="#FFB800" />
                  )}
                  {planType === "Silver" && (
                    <circle cx="14" cy="14" r="14" fill="#A3A3A3" />
                  )}
                  {planType === "Bronze" && (
                    <circle cx="14" cy="14" r="14" fill="#CD7F32" />
                  )}
                </svg>
                <h4
                  className="ps-1 fw-bold"
                  style={{
                    color:
                      planType === "Gold"
                        ? "#FFB800"
                        : planType === "Silver"
                        ? "#A3A3A3"
                        : "#CD7F32",
                  }}
                >
                  {" "}
                  {planType}{" "}
                </h4>
              </div>
              <h4 className="pe-2">
                {t("subscription.detail.price")}: {getPlanCost(planType)} ฿
              </h4>
            </div>
            <div className="px-4 d-flex justify-content-evenly">
              <div> {t("subscription.detail.startDate")}: </div>
              {startDate?.toString()}
            </div>
            <div className="px-4 d-flex justify-content-evenly">
              <div> {t("subscription.detail.endDate")}: </div>
              {endDate?.toString()}
            </div>
            <hr></hr>
            <div className="text-start ps-3">
              {" "}
              {t("profile.subsciption.planDetail")}{" "}
            </div>
            <div className="text-start pt-2 ps-4 pb-3">
              <Row>
                <small>
                  <BsCheckCircle size={16} className="me-3"></BsCheckCircle>
                  {userContext?.user?.maxMessages} {t("subscription.message")}
                </small>
              </Row>
              <Row>
                <small>
                  <BsCheckCircle size={16} className="me-3"></BsCheckCircle>
                  {t("subscription.chat")} &#40;Coming Soon&#41;
                </small>
              </Row>
              <Row>
                <small>
                  <BsCheckCircle size={16} className="me-3"></BsCheckCircle>
                  {t("subscription.support")}
                </small>
              </Row>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className={`${styles.back_button}`} onClick={handleBack}>
              {t("button.back")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function getPlanCost(planType: string) {
  const planCostMap: { [key: string]: number } = {
    Bronze: 59,
    Silver: 199,
    Gold: 299,
  };
  return planCostMap[planType];
}
