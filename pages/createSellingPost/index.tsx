import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/common/Layout";
import { GeneratedComponent } from "@/common/GeneratedComponent";

const CreateSellingPost = () => {  
  return (
    <Layout pageTitle="createSellingPost.title" pageContent="Meta description for the Home page">
      <GeneratedComponent
        titlePage="createSellingPost.title"
        titleDescription="createSellingPost.description"
      />
    </Layout>
  );

}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});


export default CreateSellingPost