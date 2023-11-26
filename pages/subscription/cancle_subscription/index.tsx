import { getCheckoutSessionUrl } from "@/api/Payments";
import { useRouter } from "next/navigation";
import React from "react";
import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
import { translate } from "@/languages/language";
import { useLanguage } from "@/contexts/LanguageContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsCheckCircle } from "react-icons/bs";
import { CheckoutSessionRequest } from "@/models/dto/requests/PaymentRequest";

export default function Subscription() {
  const router = useRouter();
  const { language } = useLanguage();

  return (
    <>
      <div className={noto_sans_thai.className}>
        <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
          <Container className={`${styles.container} text-center`}>
            <button
              type="button"
              className={`btn btn-danger`}
              data-bs-toggle="modal"
              data-bs-target="#canclepage"
            >
              ยกเลิกสมาชิก
            </button>

            <div
              className="modal fade"
              id="canclepage"
              tabIndex={1}
              aria-labelledby="canclepageLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body mb-4">
                    <div className=" text-end">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="text-center">
                      <h4 className="mb-4">
                        <b>การยกเลิกสมาชิก</b>
                      </h4>
                      <p className="mb-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        excepturi quod dolores atque maiores quasi?
                      </p>
                      <p className="mb-5" style={{ color: "red" }}>
                        Lorem ipsum dolor sit amet consectetur{" "}
                      </p>
                      <button
                        type="button"
                        className={`btn btn-danger mb-2 ${styles.cancle_btn}`}
                      >
                        ยกเลิกสมาชิก
                      </button>
                      <br />
                      <a
                        href="#"
                        data-bs-dismiss="modal"
                        style={{ color: "red", textDecoration: "underline" }}
                      >
                        <small>ไม่ ฉันเปลี่ยนใจแล้ว</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </>
  );
}
