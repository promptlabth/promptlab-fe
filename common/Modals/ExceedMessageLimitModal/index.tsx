import { TFunction } from "i18next";
import Link from "next/link";
import { Col, Modal, Row } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import styles from "./ExceedMessageLimitModal.module.css";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";

const notoSanThai = NotoSansThai({ weight: "400", subsets: ["thai"] });
export interface ExceedMessageLimitModalProps {
  translate: TFunction<"translation", undefined>;
  showModal: boolean;
  handleCloseModal?: () => void;
}

export const ExceedMessageLimitModal = (
  props: ExceedMessageLimitModalProps,
) => {
  const { translate, showModal, handleCloseModal } = props;
  return (
    <Modal className={notoSanThai.className} centered show={showModal} onHide={handleCloseModal}>
      <Modal.Body>
        <div className="text-end">
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseModal}
          ></button>
        </div>
        <div className="text-center">
          <div className="p-2 pb-4">
            <FaInfoCircle size={110} />
          </div>
          <h4 className="mb-4 fw-bold">
            {" "}
            {translate("modal.noRemainingMessage.title")}{" "}
          </h4>
          <Row className="row">
            <h5 className="text-black-50">
              {" "}
              {translate("modal.noRemainingMessage.description")}{" "}
            </h5>
            <h5 className="text-black-50">
              {" "}
              {translate("modal.noRemainingMessage.subscription")}{" "}
            </h5>

            <div className="ps-4 pe-4 pt-4">
              <Row>
                <Col className="m-1" sm>
                  <Link
                    className={`${styles.no_remaining_message_subscription_button}`}
                    href="/subscription"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {translate("modal.noRemainingMessage.subscriptionButton")}
                  </Link>
                </Col>
                <Col className="m-1" sm>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={`${styles.no_remaining_message_close_button}`}
                  >
                    {" "}
                    Back{" "}
                  </button>
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};
