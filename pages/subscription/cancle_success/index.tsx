import React from "react";
import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
import { translate } from "@/languages/language";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImSad2 } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
export default function CancelSubscriptionSuccess() {
  const { language } = useLanguage();
  return (
    <>
      <div className={noto_sans_thai.className}>
        <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
          <Container className={`${styles.container} text-center`}>
            <ImSad2 className="mt-5" fontSize={90} style={{ color: "white" }} />
            <br />
            <h4 className="mt-5" style={{ color: "white" }}>
              <b> {translate("subscription.errorText1", language)}</b>
            </h4>
            <h4 className="mt-5" style={{ color: "#63FF73" }}>
              <FaCheckCircle className="me-2" />
              <b>{translate("subscription.errorText2", language)}</b>
            </h4>
            <p className="mt-5 mb-5" style={{ color: "#AAAAAA" }}>
              {translate("subscription.errorText3", language)} <br />
              {translate("subscription.errorText4", language)}{" "}
              <a style={{ color: "#AAAAAA" }} href="#">
                {translate("subscription.errorText5", language)}
              </a>
            </p>
          </Container>
        </Container>
      </div>
    </>
  );
}
