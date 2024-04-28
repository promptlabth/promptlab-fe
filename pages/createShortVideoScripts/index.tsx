import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/common/Layout";
import { GeneratedComponent } from "@/common/GeneratedComponent";

const CreateShortVideoScripts = () => {
  return (
    <Layout
      pageTitle="createScripts.title"
      pageContent="Meta description for the Home page"
    >
      <GeneratedComponent
        titlePage="createScripts.title"
        titleDescription="createScripts.description"
      />
    </Layout>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default CreateShortVideoScripts;
