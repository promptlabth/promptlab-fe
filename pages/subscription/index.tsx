import { getCheckoutSessionUrl } from "@/api/Payments";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CheckoutSessionRequest } from "@/models/types/dto/requests/PaymentRequest.type";
import { useUserContext } from "@/contexts/UserContext";
import { SubscribeFailedModal } from "@/featureComponents/subscription/SubscribeFailedModal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Header } from "@/featureComponents/subscription/Header";
import { SubscriptionList } from "@/featureComponents/subscription/SubscriptionList";
import Layout from "@/common/Layout";
import { LoadingScreen } from "@/common/LoadingScreen";

const Subscription = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userContext = useUserContext();
  const user = userContext?.user;
  const router = useRouter();
  const { t } = useTranslation();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // This function is soonly used to handle the checkout session 
  const handleCheckoutSession = async (prizeId: string, planId: number) => {
    const checkoutSessionRequest: CheckoutSessionRequest = {
      PrizeID: prizeId,
      WebUrl: window.location.origin,
      PlanID: planId
    }
    setIsLoading(true)
    const checkoutSessionUrl = await getCheckoutSessionUrl(checkoutSessionRequest);
    if (!checkoutSessionUrl) {
      setIsLoading(false)
      handleOpenModal()
      return
    }
    router.push(checkoutSessionUrl);
  }

  return (
    <Layout pageContent="A plan subscription page" pageTitle="subscription">
      {isLoading && <LoadingScreen />}
      <SubscribeFailedModal translate={t} show={showModal} handleCloseModal={handleCloseModal} />
      <Header translate={t} user={user} />
      <SubscriptionList
        translate={t}
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

export default Subscription