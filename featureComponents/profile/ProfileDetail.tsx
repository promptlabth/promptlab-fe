import { Col, Container, Row } from "react-bootstrap";
import { ProfilShowProps } from "@/models/interfaces/ProfileShow.interface";
import { BsCheckCircle } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner';
import styles from "./Profile.module.css";
import { UserProfilePic } from "@/common/UserProfilePicture";
export const ProfileDetail = (props: ProfilShowProps) => {
  const { translate, user, handleShowModal } = props;
  const borderColor =
    user?.planType! === "Gold" ? "3.25px solid #FFB800" :
      user?.planType! === "Silver" ? "3.25px solid #A8A8A8" :
        user?.planType! === "Bronze" ? "3.25px solid #CD7F32"
          : "none"

  const background = user ? styles.profile_container_bg : styles.blur_profile_container_bg

  return (
    <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
      <Container className={styles.page_container}>
        <figure className="text-center pb-1 pt-3 text-light">
          <h2>
            <b>{translate("profile.title")}</b>
          </h2>
        </figure>
        <Container fluid={true} className={background}>
          <Row className="pt-1">
            <Row className="text-white d-flex align-items-center">
              <div className="col-md-1">
                <div className={`${styles.user_profile_pic_container}`}>
                  <UserProfilePic user={user!} />
                </div>
              </div>
              <div className="col-md-11 text-white">
                <div className={styles.user_profile_detail_container}>
                  <div className="ps-2">
                    <h4 className="fw-bold"> {user?.name} </h4>
                    <div className="">
                      {" "}
                      <b>Email:</b> {user?.email}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Row>
          <hr className="text-white"></hr>
          <h4 className="fw-bold text-white">
            {" "}
            {translate("profile.subscription.title")}
          </h4>
          <Row className={`${styles.profile_text}`}>
            <Col md={7} className="ps-3 text-white">
              <div className="d-flex align-items-center">
                <div className="pe-2">
                  {" "}
                  {translate("profile.subscription.planTitle")}:{" "}
                </div>
                <svg
                  className="mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  {user?.planType! === "Gold" && (
                    <circle cx="14" cy="14" r="14" fill="#FFB800" />
                  )}
                  {user?.planType! === "Silver" && (
                    <circle cx="14" cy="14" r="14" fill="#A3A3A3" />
                  )}
                  {user?.planType! === "Bronze" && (
                    <circle cx="14" cy="14" r="14" fill="#CD7F32" />
                  )}
                </svg>
                <div
                  className="fw-bold ps-2"
                  style={{
                    color:
                      user?.planType! === "Gold"
                        ? "#FFB800"
                        : user?.planType! === "Silver"
                          ? "#A3A3A3"
                          : user?.planType! === "Bronze"
                            ? "#CD7F32"
                            : "white",
                  }}
                >
                  {" "}
                  {user?.planType}{" "}
                </div>
              </div>
            </Col>
            <Col md={5} className="ps-3 text-white">
              <Col className="d-flex justify-content-between">
                <div> {translate("subscription.detail.startDate")} </div>
                {user?.planType! === "Free" ? "-" : new Date(user?.start_date!).toLocaleString()}
              </Col>
              <Col className="d-flex justify-content-between">
                <div> {translate("subscription.detail.endDate")} </div>
                {user?.planType! === "Free" ? "-" : new Date(user?.end_date!).toLocaleString()}
              </Col>
            </Col>
          </Row>
          <h4 className="pt-3 fw-bold text-white">
            {" "}
            {translate("profile.subsciption.planDetail")}{" "}
          </h4>
          <Row className={`text-white ${styles.profile_text} ps-2`}>
            <div className="text-start">
              <Row>
                <div>
                  <BsCheckCircle size={16} className="me-3" />
                  {user?.maxMessages} {translate("subscription.message")}
                </div>
              </Row>
              <Row>
                <div>
                  <BsCheckCircle size={16} className="me-3" />
                  {translate("subscription.chat")} &#40;Coming Soon&#41;
                </div>
              </Row>
              <Row>
                <div>
                  <BsCheckCircle size={16} className="me-3" />
                  {translate("subscription.support")}
                </div>
              </Row>
            </div>
          </Row>
          {user?.planType! !== "Free" && (
            <div
              className={`pt-4 ${styles.cancle_subscription_button_container}`}
            >
              <button
                className={`${styles.cancle_subscription_button}`}
                onClick={handleShowModal}
              >
                {translate("subscription.canclesubscription")}
              </button>
            </div>
          )}
        </Container>
      </Container>
    </Container>
  );
};
