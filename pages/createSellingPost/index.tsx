import { translate } from "@/languages/language";
import TableComponents from "@/components/GenerateComponnet";
import {  Language, useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
const CreateSellingPost = () => {
   const { language } = useLanguage();
   return (
      <div>
         <Head>
            <title>{translate('createSellingPost.title', language)}</title>
            <meta name="description" content="Meta description for the Home page" />
         </Head>
         <TableComponents
            titlePage="createSellingPost.title"
            titleDescription="createSellingPost.description"
            prompt={(input: string, type: string) => getPrompt(input, type, language)}
         />
      </div>
   );

}

const getPrompt = (input: string, type: string, language: Language): string => {
   switch (language) {
      case 'eng':
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}]:`;
      case 'th':
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}] [เป็นภาษาไทยเท่านั้น]:`;
      case 'id':
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}] [in Bahasa Indonesia Only]:`;
      default:
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}]:`;
   }
};


export default CreateSellingPost