import React, {  useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import styles from "./SubscriptionModal.module.css";
import Link from "next/link";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import { MdWorkspacePremium } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });

const SubscriptionModal = ({ show }: any) => {
  const { t } = useTranslation()
  const translate = t;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    Cookies.set("modalShown", "true", { expires: 3 }); // Expires in 7 days
    setShowModal(false);
  };
  useEffect(() => {
    setShowModal(show);
  }, [show]);

  return (
    <Modal
      className={notoSansThai.className}
      size="lg"
      centered
      show={showModal}
      onHide={handleClose}
    >
      <div
        className="d-flex justify-content-end"
        style={{ backgroundColor: "none" }}
      >
        <IoMdClose
          onClick={handleClose}
          size={40}
          style={{ zIndex: 1, position: "absolute", cursor: "pointer" }}
        />
      </div>
      <Modal.Body
        style={{
          padding: "0.8rem",
          paddingTop: "0rem",
          paddingBottom: "0rem",
          backgroundColor: "none",
          borderRadius: "20px",
        }}
      >
        <Row style={{ borderRadius: "20px" }}>
          <Col
            md
            className={`d-flex align-items-center justify-content-center ${styles.subscription_modal_bg}`}
          >
            <h1 className="fw-bold" style={{ zIndex: 1, position: "absolute" }}>
              {" "}
              Prompt Lab AI
            </h1>
            <img
              src="/images/subscription_modal_bg.png"
              alt="image"
              style={{ width: "110%", height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col
            md
            className="d-flex align-items-center justify-content-center p-3"
            style={{ backgroundColor: "#00FFAB", borderRadius: 10 }}
          >
            <div>
              <div
                className={`${styles.subscription_icon} d-flex justify-content-center pb-4`}
              >
                <MdWorkspacePremium size={85} />
              </div>
              <h4 className="fw-bold text-center"> Prompt Lab Subscription </h4>
              <div className="py-2 text-center">
                <div className="">{translate("modal.subsciption.description")}</div>
                <h5 className="pt-3">
                  <b> {translate("modal.subscription.price")} </b>
                </h5>
              </div>
              <div className="d-flex justify-content-center">
                <Link
                  href={"/subscription"}
                  onClick={handleClose}
                  className={styles.subscription_modal_btn}
                >
                  {translate("subscription")}
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionModal;
