import { TFunction } from "i18next";
import { Modal } from "react-bootstrap";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import { FaInfoCircle } from "react-icons/fa";

interface ErrorModalProps {
  title: string;
  description: string;
  showModal: boolean;
  handleCloseModal?: () => void;
  translate: TFunction<"translation", undefined>;
}

const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });

export const ErrorModal = (props: ErrorModalProps) => {
  const { title, description, translate, showModal, handleCloseModal } = props;
  return (
    <Modal
      className={notoSansThai.className}
      centered
      show={showModal}
      onHide={handleCloseModal}
    >
      <Modal.Body className="text-center">
        <div className="text-end">
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseModal}
          ></button>
        </div>
        <FaInfoCircle size={85} className="mb-3" style={{ color: "red" }} />
        <h4 className="mb-4 fw-bold text-danger">{translate(title)}</h4>
        <h5>{translate(description)}</h5>
      </Modal.Body>
    </Modal>
  );
};
