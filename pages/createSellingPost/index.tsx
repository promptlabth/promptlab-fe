import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { Language, useLanguage } from "@/contexts/LanguageContext";
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
            getPrompt={(input: string, type: string) => getPromptForSellingPost(input, type, language)}
         />
      </div>
   );

}

export function getPromptForSellingPost(input: string, type: string, language: Language): string {
   const prompt =
   language === "th" ?
      `Write a social media announcement about [product] and the feeling of message is [emotional of massage] in Thai:
      product: ${input}
      emotional of massage ${type}`:
      language === "eng" ?
      `Write a social media announcement about [product] and the feeling of message is [emotional of massage]:   
      product: ${input}
      emotional of massage ${type}`:
      `Write a social media announcement about [product] and the feeling of message is [emotional of massage]:
      product: ${input}
      emotional of massage ${type}`
   return prompt
}


/**
 * Function to generate an English prompt message for a selling post.
 * @param input The product description or name.
 * @param type The emotional aspect of the message. 
 * @returns The generated prompt message in English.
*/

const getPromptforSellingPostEn = (input: string, type: string): string => {
   return `
    Write a social media announcement about [product] and the feeling of message is [emotional of massage]:
    product: ${input}
    emotional of massage ${type}
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
    Write a social media announcement about [product] and the feeling of message is [emotional of massage] in Thai:
    product: ${input}
    emotional of massage ${type}
    `;
}

export default CreateSellingPost