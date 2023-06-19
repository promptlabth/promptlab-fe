import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { Language, useLanguage } from "@/contexts/LanguageContext";
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
            getPrompt={(input: string, type: string) => getPromtforIdeaContent(input, type, language)} />
      </div>
   );

}

export function getPromtforIdeaContent(input: string, type: string, language : Language): string {
   const prompt =
      language === "th" ?
         `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}]
         Show list of idea with short biref in Thai language:`:
      language === "en" ?
         `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
         show list of idea with short biref:`:
         
         `Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
         show list of idea with short biref:`
   return prompt
}


const getPromtforIdeaContentEn = (input: string, type: string): string => {
   return `
    Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
    show list of idea with short biref:
    `;
}

const getPromtforIdeaContentTh = (input: string, type: string): string => {
   return `    
    Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}]
    Show list of idea with short biref in Thai language:
    `;
}

export default CreateContent