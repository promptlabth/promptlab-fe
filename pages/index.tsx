import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useUserContext } from "@/contexts/UserContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomePresentation from "@/featureComponents/home/HomePresentation";


const HomeContainer = () => {
  const userContext = useUserContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalShown = Cookies.get("modalShown");
    if (modalShown === undefined) {
      setShowModal(true);
    }
  }, []);

  return (
    <HomePresentation
      userContext={userContext}
      showModal={showModal}
    />
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default HomeContainer;
