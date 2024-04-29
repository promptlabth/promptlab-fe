import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PrivacyPolicy from "@/featureComponents/privacy/PrivacyPolicy";
<<<<<<< HEAD
=======
import Layout from "@/common/Layout";
>>>>>>> refactor/restructure

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});


const PrivacyPolicyContainer = () => {
<<<<<<< HEAD
  return <PrivacyPolicy />;
=======
  return (
    <Layout pageTitle="privacyPolicy" pageContent="privacyPolicy">
      <PrivacyPolicy />
    </Layout>
  );
>>>>>>> refactor/restructure
};

export default PrivacyPolicyContainer;