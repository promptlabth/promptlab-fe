import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
const CreateSellingPost = () => {
   /* 
   ใช้ idToken ในการ authen และ extract ข้อมูล
   */
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
            modelConfig={{
               model: "gpt-3.5-turbo",
               temperature: 0.7,
               maxToken: 4000
            }}
            promptEn={(input: string, type: string) => getPromptforSellingPostEn(input, type)}
            promptTh={(input: string, type: string) => getPromptforSellingPostTh(input, type)}
         />
      </div>
   );

}

/* # Pseudo code of new get prompt function
   function getPromptMessage(input, type) then
      let promptPayload = {
         prompt : `Write a social media announcement about [product] and the feeling....`
         input : input,
         type : type,
      } 
      return promptPayload
   end
*/

/**
 * Function to generate an English prompt message for a selling post.
 * @param input The product description or name.
 * @param type The emotional aspect of the message. 
 * @returns The generated prompt message in English.
*/

const getPromptforSellingPostEn = (input: string, type: string): string => {
   return `
    Write a social media announcement about [${input}] and the feeling of message is [${type}]:
    `;
}

/**
 * Function to generate a Thai prompt message for a selling post.
 * @param input The product description or name.
 * @param type The emotional aspect of the message. 
 * @returns The generated prompt message in Thai.
*/
const getPromptforSellingPostTh = (input: string, type: string): string => {
   return `
    Write a social media announcement about [${input}] and the feeling of message is [${type}] [เป็นภาษาไทยเท่านั้น]:
    `;
}

export default CreateSellingPost