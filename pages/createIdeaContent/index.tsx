import GenerateComponent from "@/components/GenerateComponent";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
const CreateContent = () => {
   const { t, i18n } = useTranslation()
   return (
      <div>
         <Head>
            <title>{t('createContents.title')}</title>
            <meta name="description" content="Meta description for the Home page" />
         </Head>
         <GenerateComponent
            titlePage="createContents.title"
            titleDescription="createContents.description"
            prompt={(input: string, type: string) => getPrompt(input, type, i18n.language)} 
            />
      </div>
   );

}

const getPrompt = (input: string, type: string, language: string): string => {
   switch (language) {
      case 'en':
         return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
         show list of idea with short biref:`;
      case 'th':
         return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
         show list of idea with short biref [เป็นภาษาไทยเท่านั้น]:`;
      case 'id':
         return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
         show list of idea with short biref [in Bahasa Indonesia Only]:`;
      default:
         return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
         show list of idea with short biref:`;
   }
};
export const getServerSideProps = async ({ locale }: any) => ({
   props: {
       ...(await serverSideTranslations(locale, ['common']))
   }
});

export default CreateContent