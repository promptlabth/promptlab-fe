import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/common/Layout";
import { GeneratedComponent } from "@/common/GeneratedComponent";

const CreateClickBaitWord = () => {
  return (
    <Layout
      pageTitle="createClickBait.title"
      pageContent="Meta description for the Home page"
    >
      <GeneratedComponent
        titlePage="createClickBait.title"
        titleDescription="createClickBait.description"
      />
    </Layout>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default CreateClickBaitWord;
