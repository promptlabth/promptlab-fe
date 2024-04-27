import { getCheckoutSessionUrl } from "@/api/Payments";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container, } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
import styles from "./styles.module.css";
import { CheckoutSessionRequest } from "@/models/dto/requests/PaymentRequest";
import { useUserContext } from "@/contexts/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import SubscriptionFailedModal from "@/components/modals/SubscriptionFailed";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Header } from "@/featureComponents/subscription/Header";
import { SubscriptionList } from "@/featureComponents/subscription/SubscriptionList";
import { Layout } from "@/common/Layout";

const notoSansThai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
export default function Subscription() {
  const [showFailedSubscribeModal, setShowFailedSubscribeModal] = useState(false);
  const userContext = useUserContext();
  const user = userContext?.user;
  const router = useRouter();
  const { t } = useTranslation();

  // This function is soonly used to handle the checkout session 
  const handleCheckoutSession = async (prizeId: string, planId: number) => {
    const data: CheckoutSessionRequest = {
      PrizeID: prizeId,
      WebUrl: window.location.origin,
      PlanID: planId
    }
    const checkoutSessionUrl = await getCheckoutSessionUrl(data);
    if (!checkoutSessionUrl) {
      setShowFailedSubscribeModal(true);
      return
    }
    router.push(checkoutSessionUrl);
  }

  /* 
  <div className={notoSansThai.className}>
      <Head>
        <title>{t("subscription")}</title>
        <meta name="description" content="A generated messages history" />
      </Head>
      <div>
        <SubscriptionFailedModal show={showFailedSubscribeModal} hideModal={setShowFailedSubscribeModal} />
        <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
          <Header translate={t} user={user} />
        </Container>
        <Container className={`${styles.container}`}>
          <SubscriptionList
            translate={t}
            user={user}
            handleCheckoutSession={handleCheckoutSession}
          />
        </Container>
      </div>
    </div>
  
  */

  return (
    <Layout pageContent="A plan subscription page" pageTitle="subscription">
      <SubscriptionFailedModal show={showFailedSubscribeModal} hideModal={setShowFailedSubscribeModal} />
      <Header translate={t} user={user} />
      <SubscriptionList
        translate={t}
        user={user}
        handleCheckoutSession={handleCheckoutSession}
      />
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});