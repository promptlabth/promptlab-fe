import React, { useState } from "react";
import { Noto_Sans_Thai } from "next/font/google";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { cancelUserSubscribe } from "@/api/Payments";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ProfileDetail } from "@/featureComponents/profile/ProfileDetail";
import { Header } from "@/featureComponents/profile/Header";
import { CancelSubscriptionModal } from "@/featureComponents/profile/CancelSubscriptionModal";
const notoSansThai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
const Profile = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const router = useRouter();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCancelSubscription = async () => {
    const result = await cancelUserSubscribe();
    if (result) {
      router.push("/subscription/cancle_success");
    }
  };

  return (
    <div className={notoSansThai.className}>
      <Header translate={t} />
      <CancelSubscriptionModal
        translate={t}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleCancelSubscription={handleCancelSubscription}
      />
      <ProfileDetail translate={t} user={user} handleShowModal={handleShowModal}/>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Profile;
