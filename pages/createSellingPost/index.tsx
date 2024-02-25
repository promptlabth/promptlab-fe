import GenerateComponent from "@/components/GenerateComponent";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
const CreateSellingPost = () => {
   const { t, i18n } = useTranslation()
   return (
      <div>
         <Head>
            <title>{t('createSellingPost.title')}</title>
            <meta name="description" content="Meta description for the Home page" />
         </Head>
         <GenerateComponent
            titlePage="createSellingPost.title"
            titleDescription="createSellingPost.description"
            prompt={(input: string, type: string) => getPrompt(input, type, i18n.language)}
         />
      </div>
   );

}

const getPrompt = (input: string, type: string, language: string): string => {
   switch (language) {
      case 'en':
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}]:`;
      case 'th':
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}] [เป็นภาษาไทยเท่านั้น]:`;
      case 'id':
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}] [in Bahasa Indonesia Only]:`;
      default:
         return `Write a social media announcement about [${input}] and the feeling of message is [${type}]:`;
   }
};


export const getServerSideProps = async ({ locale }: any) => ({
   props: {
       ...(await serverSideTranslations(locale, ['common']))
   }
});


export default CreateSellingPost