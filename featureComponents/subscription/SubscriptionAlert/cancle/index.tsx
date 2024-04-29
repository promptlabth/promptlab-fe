import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
import { ImSad2 } from "react-icons/im";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import styles from "./cancle.module.css";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });

export default function CancelSubscriptionSuccess({
  userEndDate,
  goBackToHome,
}: any) {
  const { t } = useTranslation();


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
            <div className="mt-3 mb-1" style={{ color: "#AAAAAA" }}>
              <div>
                {t("subscription.canclesubscription.description")}{" "}
                {new Date(userEndDate!).toLocaleString()}
              </div>
            </div>
            <button onClick={goBackToHome} className="btn btn-primary mt-3">
              {t("common.goBack")}
            </button>
          </Container>
        </Container>
      </div>
    </>
  );
}
