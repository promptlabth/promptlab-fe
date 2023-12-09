import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
import { translate } from "@/languages/language";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImSad2 } from "react-icons/im";
import Head from "next/head";
import { useUserContext } from "@/contexts/UserContext";
export default function CancelSubscriptionSuccess() {
  const { language } = useLanguage();
  const userContext = useUserContext();
  return (
    <>
      <Head>
        <title>{translate("subscription.canclesubscription", language)}</title>
        <meta name="description" content="A generated messages history" />
      </Head>
      <div className={noto_sans_thai.className}>
        <Container fluid={true} className="bg-dark pt-5 pb-5">
          <Container className={`${styles.container} text-center`}>
            <ImSad2 className="mt-5" fontSize={90} style={{ color: "white" }} />
            <br />
            <h3 className="pt-4 pb-2 text-danger">
              <b> {translate("subscription.canclesubscription.header", language)} </b> 
            </h3>
            <h5 className="text-white">
              <b> {translate("subscription.errorText1", language)}</b>
            </h5>
            {/* <h4 className="mt-5" style={{ color: "#63FF73" }}>
              <FaCheckCircle className="me-2" />
              <b>{translate("subscription.errorText2", language)}</b>
            </h4> */}
            <div className="mt-3 mb-1" style={{ color: "#AAAAAA" }}>
              <div>
                {translate("subscription.canclesubscription.description", language)}{" "}{userContext?.user?.end_date?.toString()}
              </div>
              {/* {translate("subscription.errorText3", language)} <br />
              {translate("subscription.errorText4", language)}{" "}
              <a style={{ color: "#AAAAAA" }} href="#">
                {translate("subscription.errorText5", language)}
              </a> */}
            </div>
          </Container>
        </Container>
      </div>
    </>
  );
}
