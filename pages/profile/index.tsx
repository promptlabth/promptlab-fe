import React, { useEffect, useState } from "react";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { apiCancelUserSubscribe } from "@/services/api/PaymentAPI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ProfileDetail } from "@/featureComponents/profile/ProfileDetail";
import { Header } from "@/featureComponents/profile/Header";
import { CancelSubscriptionModal } from "@/featureComponents/profile/CancelSubscriptionModal";
import { LoadingScreen } from "@/common/LoadingScreen";
const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });
const Profile = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const router = useRouter();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCancelSubscription = async () => {
    const result = await apiCancelUserSubscribe();
    if (result) {
      router.push("/subscription/cancle_success");
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false)
    }
  }, [user])

  return (
    <div className={notoSansThai.className}>
      {isLoading && <LoadingScreen />}
      <Header translate={t} />
      <CancelSubscriptionModal
        translate={t}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleCancelSubscription={handleCancelSubscription}
      />
      <ProfileDetail translate={t} user={user} handleShowModal={handleShowModal} />
    </div>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Profile;
