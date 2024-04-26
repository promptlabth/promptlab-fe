import { FaInfoCircle } from "react-icons/fa";
import styles from "./Profile.module.css";
import { CancelSubscriptionModalProps } from "@/models/interfaces/CancelSubscriptionModal.interface";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export const CancelSubscriptionModal = (props: CancelSubscriptionModalProps) => {
  const { translate, handleCancelSubscription, showModal, handleCloseModal } = props;
  return (
    <Modal centered show={showModal} onHide={handleCloseModal}>
      <Modal.Body>
        <div className="text-end">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseModal}
          ></button>
        </div>
        <div className="text-center">
          <FaInfoCircle size={85} className="mb-3" style={{ color: "red" }} />
          <h4 className="mb-4">
            <b>{translate("subscription.canclesubscription")}</b>
          </h4>
          <p className="mb-3">
            {translate("subscription.canclesubscription.ask")}
          </p>
          <button
            type="button"
            onClick={() => {
              handleCancelSubscription();
            }}
            className={`btn btn-danger mb-2 ${styles.cancle_btn}`}
            data-bs-dismiss="modal"
          >
            {translate("subscription.canclesubscription")}
          </button>
          <br />
          <Button
            onClick={handleCloseModal}
            variant="link"
            style={{ color: "red", textDecoration: "none" }}
          >
            <small>
              {translate("subscription.canclesubscription.cancel")}{" "}
            </small>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
