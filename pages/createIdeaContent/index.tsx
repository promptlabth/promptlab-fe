import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/common/Layout";
import { GeneratedComponent } from "@/common/GeneratedComponent";

const CreateContent = () => {
  return (
    <Layout
      pageTitle="createContents.title"
      pageContent="Meta description for the Home page"
    >
      <GeneratedComponent
        titlePage="createContents.title"
        titleDescription="createContents.description"
      />
    </Layout>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default CreateContent;
