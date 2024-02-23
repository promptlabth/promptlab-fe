import { translate } from "@/languages/language";
import TableComponents from "@/components/GenerateComponent";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
const CreateArticle = () => {
    const { language } = useLanguage();
    const { t, i18n } = useTranslation()
    return (
        <div>
            <Head>
                <title>{translate("createArticle.title", language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage="createArticle.title"
                titleDescription="createArticle.description"
                prompt={(input: string, type: string) => getPrompt(input, type, language)}
                translate={t}
            />
        </div>
    );

}


const getPrompt = (input: string, type: string, language: Language): string => {
    switch (language) {
        case 'eng':
            return `Write a blog post with high demand SED keyword that talks about [${input}] that article should feel like [${type}]:`;
        case 'th':
            return `
            Write a blog post with high demand SED keyword that talks about [main topic of article] that article should feel like [emotion of message] [เป็นภาษาไทย]:
            main topic of article: ${input}
            emotion of message: ${type}`;
        case 'id':
            return `
            Write a blog post with high demand SED keyword that talks about [${input}] that article should feel like [${type}] in [Bahasa Indonesia]:`;
        default:
            return `
            Write a blog post with high demand SED keyword that talks about [main topic of article] that article should feel like [emotion of message]:
            main topic of article: ${input}
            emotion of message: ${type}`;
    }
};

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
 });

 
export default CreateArticle