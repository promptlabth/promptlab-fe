import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PrivacyPolicy from "@/featureComponents/privacy/PrivacyPolicy";

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});


const PrivacyPolicyContainer = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyContainer;