import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import {  useLanguage } from "@/contexts/LanguageContext";
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
            prompt={(input: string, type: string) => getPrompt(input, type, language)}
         />
      </div>
   );

}

const getPrompt = (input: string, type: string, language: 'eng' | 'th' | 'id'): string => {
   if (language === 'eng') {
      return `Write a social media announcement about [${input}] and the feeling of message is [${type}]:`
   } else if (language === 'th') {
       return `Write a social media announcement about [${input}] and the feeling of message is [${type}] [เป็นภาษาไทยเท่านั้น]:`
   } else if (language === 'id') {
      return `Write a social media announcement about [${input}] and the feeling of message is [${type}] [in Bahasa Indonesia Only]:`
   }

   return `Write a social media announcement about [${input}] and the feeling of message is [${type}]:`
};


export default CreateSellingPost