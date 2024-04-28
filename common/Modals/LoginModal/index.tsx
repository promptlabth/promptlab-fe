import { TFunction } from "i18next";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import { Col, Modal, Row } from "react-bootstrap";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import styles from "./LoginModal.module.css";

const notoSanThai = NotoSansThai({ weight: "400", subsets: ["thai"] });
export interface LoginModalProps {
  translate: TFunction<"translation", undefined>;
  showModal: boolean;
  handleCloseModal?: () => void;
  handleLogin: (typeLogin: string) => Promise<void>;
}

export const LoginModal = (props: LoginModalProps) => {
  const { translate, showModal, handleCloseModal, handleLogin } = props;
  return (
    <Modal
      className={notoSanThai.className}
      centered
      show={showModal}
      onHide={handleCloseModal}
    >
      <Modal.Body className="text-center">
        <h4 className="mb-4">{translate("modal.pleaseLoginBeforeGenerate")}</h4>
        <Row className="row">
          <Col className="d-flex flex-column align-items-center">
            <button
              className={` mb-3 ${styles.btn}`}
              onClick={() => {
                handleLogin("facebook");
              }}
            >
              <BsFacebook
                className="me-3 align-items-start"
                fontSize={20}
              ></BsFacebook>
              {translate("login")}&nbsp;Facebook
            </button>
            <p style={{ color: "#c2c2c2" }}>- or -</p>
            <button
              className={`${styles.btn_google}`}
              onClick={() => {
                handleLogin("gmail");
              }}
            >
              <FcGoogle className="me-3" fontSize={20}></FcGoogle>
              {translate("login")}&nbsp;Google
            </button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
