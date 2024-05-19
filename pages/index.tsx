import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomePresentation from "@/featureComponents/home/HomePresentation";
import { apiGetAllConfigs } from "@/services/api/ConfigAPI";
import { usePromptyContext } from "@/contexts/PromptyContext";

const HomeContainer = () => {
  const { user } = usePromptyContext()

  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const modalShown = Cookies.get("modalShown");
    if (modalShown === undefined) {
      setShowModal(true);
    }
  }, []);

  return (
    <HomePresentation
      user={user}
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
