import { apiGetCheckoutSessionUrl } from "@/services/api/PaymentAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CheckoutSessionRequest } from "@/models/types/dto/requests/PaymentRequest.type";
import { SubscribeFailedModal } from "@/featureComponents/subscription/SubscribeFailedModal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Header } from "@/featureComponents/subscription/Header";
import { SubscriptionList } from "@/featureComponents/subscription/SubscriptionList";
import Layout from "@/common/Layout";
import { LoadingScreen } from "@/common/LoadingScreen";
import { LoginModal } from "@/common/Modals/LoginModal";
import { ErrorModal } from "@/common/Modals/ErrorModal";
import { usePromptyContext } from "@/contexts/PromptyContext";

const Subscription = () => {
  const [showSubscribeFailModal, setShowSubscribeFailModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, handleLogin } = usePromptyContext();
  const router = useRouter();
  const { t } = useTranslation();

  const handleOpenSubscribeFailModal = () => setShowSubscribeFailModal(true);
  const handleCloseSubscribeFailModal = () => setShowSubscribeFailModal(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleShowErrorModal = () => setShowErrorModal(true);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  // This function is soonly used to handle the checkout session 
  const handleCheckoutSession = async (prizeId: string, planId: number) => {
    try {
      if (!user) {
        handleShowLoginModal()
        return;
      }
  
      const checkoutSessionRequest: CheckoutSessionRequest = {
        PrizeID: prizeId,
        WebUrl: window.location.origin,
        PlanID: planId
      }
      setIsLoading(true)
      const checkoutSessionUrl = await apiGetCheckoutSessionUrl(checkoutSessionRequest);
      if (!checkoutSessionUrl) {
        setIsLoading(false)
        handleOpenSubscribeFailModal()
        return
      }
      router.push(checkoutSessionUrl);
    } catch(error) {
      console.error(error)
      handleShowErrorModal()
    }
  }

  return (
    <Layout pageContent="A plan subscription page" pageTitle="subscription">
      {isLoading && <LoadingScreen />}
      <ErrorModal
        title="modal.error"
        description="modal.error.description"
        translate={t}
        showModal={showErrorModal}
        handleCloseModal={handleCloseErrorModal}
      />
      <LoginModal 
        title="modal.pleaseLoginBeforeSubscribe" 
        translate={t}
        showModal={showLoginModal}
        handleCloseModal={handleCloseLoginModal}
        handleLogin={handleLogin}
      />
      <SubscribeFailedModal translate={t} show={showSubscribeFailModal} handleCloseModal={handleCloseSubscribeFailModal} />
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