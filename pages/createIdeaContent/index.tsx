import { translate } from "@/languages/language";
import TableComponents from "@/components/GenerateComponent";
import {  Language, useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
const CreateContent = () => {
   const { language } = useLanguage();
   const { t, i18n } = useTranslation()
   return (
      <div>
         <Head>
            <title>{translate('createContents.title', language)}</title>
            <meta name="description" content="Meta description for the Home page" />
         </Head>
         <TableComponents
            titlePage="createContents.title"
            titleDescription="createContents.description"
            prompt={(input: string, type: string) => getPrompt(input, type, language)} 
            translate={t}
            />
      </div>
   );

}

const getPrompt = (input: string, type: string, language: Language): string => {
   switch (language) {
      case 'eng':
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