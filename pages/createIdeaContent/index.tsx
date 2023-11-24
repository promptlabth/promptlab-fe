import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import {  useLanguage } from "@/contexts/LanguageContext";
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
            modelConfig={{
               model: "gpt-3.5-turbo",
               temperature: 0.7,
               maxToken: 4000
            }}
            prompt={(input: string, type: string) => getPrompt(input, type, language)} />
      </div>
   );

}

const getPrompt = (input: string, type: string, language: 'eng' | 'th' | 'id'): string => {
    if (language === 'eng') {
        return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
        show list of idea with short biref:`;
    } else if (language === 'th') {
        return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
        show list of idea with short biref [เป็นภาษาไทยเท่านั้น]:`;
    } else if (language === 'id') {
        return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
        show list of idea with short biref [in Bahasa Indonesia Only]:`;
    }

    return `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
    show list of idea with short biref:`;
};

export default CreateContent