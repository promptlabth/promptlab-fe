// Container Component
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import HelpPresentation from "@/featureComponents/help/HelpPresentation";  

const HelpContainer = ({ locale }: any) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLineButtonClick = () => {
    router.push("https://lin.ee/4EpU6b6");
  };

  return (
    <HelpPresentation
      t={t}
      handleLineButtonClick={handleLineButtonClick}
    />
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default HelpContainer;
