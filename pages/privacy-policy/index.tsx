import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PrivacyPolicy from "@/featureComponents/privacy/PrivacyPolicy";
import Layout from "@/common/Layout";

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});


const PrivacyPolicyContainer = () => {
  return (
    <Layout pageTitle="privacyPolicy" pageContent="privacyPolicy">
      <PrivacyPolicy />
    </Layout>
  );
};

export default PrivacyPolicyContainer;