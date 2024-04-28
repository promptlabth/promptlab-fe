import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/common/Layout";
import { GeneratedComponent } from "@/common/GeneratedComponent";
/* 
   <div>
      <Head>
        <title>{t("createArticle.title")}</title>
        <meta name="description" content="Meta description for the Home page" />
      </Head>
      <GenerateComponent
        titlePage="createArticle.title"
        titleDescription="createArticle.description"
        prompt={(input: string, type: string) =>
          getPrompt(input, type, i18n.language)
        }
      />
    </div>

*/
const CreateArticle = () => {
  return (
    <Layout
      pageTitle="createArticle.title"
      pageContent="Meta description for the Home page"
    >
      <GeneratedComponent
        titlePage="createArticle.title"
        titleDescription="createArticle.description"
      />
    </Layout>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default CreateArticle;
