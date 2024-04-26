import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
import { ImSad2 } from "react-icons/im";
import Head from "next/head";
import { useUserContext } from "@/contexts/UserContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export default function CancelSubscriptionSuccess() {
  const userContext = useUserContext();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("subscription.canclesubscription")}</title>
        <meta name="description" content="A generated messages history" />
      </Head>
      <div className={noto_sans_thai.className}>
        <Container fluid={true} className="bg-dark pt-5 pb-5">
          <Container className={`${styles.container} text-center`}>
            <ImSad2 className="mt-5" fontSize={90} style={{ color: "white" }} />
            <br />
            <h3 className="pt-4 pb-2 text-danger">
              <b> {t("subscription.canclesubscription.header")} </b> 
            </h3>
            <h5 className="text-white">
              <b> {t("subscription.errorText1")}</b>
            </h5>
            {/* <h4 className="mt-5" style={{ color: "#63FF73" }}>
              <FaCheckCircle className="me-2" />
              <b>{translate("subscription.errorText2", language)}</b>
            </h4> */}
            <div className="mt-3 mb-1" style={{ color: "#AAAAAA" }}>
              <div>
                {t("subscription.canclesubscription.description")}{" "}{new Date(userContext?.user?.end_date!).toLocaleString()}
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

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
      ...(await serverSideTranslations(locale, ['common']))
  }
});
