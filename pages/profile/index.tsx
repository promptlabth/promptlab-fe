import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiCancelUserSubscribe } from "@/services/api/PaymentAPI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ProfileDetail } from "@/featureComponents/profile/ProfileDetail";
import { CancelSubscriptionModal } from "@/featureComponents/profile/CancelSubscriptionModal";
import { LoadingScreen } from "@/common/LoadingScreen";
import { usePromptyContext } from "@/contexts/PromptyContext";
import Layout from "@/common/Layout";
const Profile = () => {
  const { user } = usePromptyContext();
  const router = useRouter();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCancelSubscription = async () => {
    const result = await apiCancelUserSubscribe();
    if (result) {
      router.push("/subscription/cancle");
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false)
    }
  }, [user])

  return (
    <Layout pageContent="A profile page" pageTitle="profile.title">
      {isLoading && <LoadingScreen />}
      <CancelSubscriptionModal
        translate={t}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleCancelSubscription={handleCancelSubscription}
      />
      <ProfileDetail translate={t} user={user} handleShowModal={handleShowModal} />
    </Layout>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Profile;
