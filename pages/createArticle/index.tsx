import { translate } from "@/languages/language";
import TableComponents from "@/components/GenerateComponnet";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";

const CreateArticle = () => {
    const { language } = useLanguage();
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
export default CreateArticle