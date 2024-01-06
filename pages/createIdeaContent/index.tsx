import { translate } from "@/languages/language";
import TableComponents from "@/components/GenerateComponent";
import {  Language, useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
const CreateContent = () => {
   const { language } = useLanguage();
   return (
      <div>
         <Head>
            <title>{translate('createContents.title', language)}</title>
            <meta name="description" content="Meta description for the Home page" />
         </Head>
         <TableComponents
            titlePage="createContents.title"
            titleDescription="createContents.description"
            prompt={(input: string, type: string) => getPrompt(input, type, language)} />
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

export default CreateContent