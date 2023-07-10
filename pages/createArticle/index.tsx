import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { Language, useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";

const CreateArticle = () => {
    const { language } = useLanguage();
    return (
        <div>
            <Head>
                <title>{translate('createArticle.title', language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage="createArticle.title"
                titleDescription="createArticle.description"
                modelConfig={{
                    model: "gpt-4",
                    temperature: 0.7,
                    maxToken: 4000
                }}
                getPrompt={(input: string, type: string) => getPromptForArticle(input, type, language)}
            />
        </div>
    );

}

export function getPromptForArticle(input: string, type: string, language : Language): string {
    const prompt =
        language === "th" ?
            `Write a blog post with hight demand SED keyword that talk about [main topic of article] that article should feeling like [emotion of massage] in Thai:
            main topic of article: ${input}
            emotion of massage: ${type}`:
            
        language === "eng" ?
            `Write a blog post with hight demand SED keyword that talk about [main topic of article] that article should feeling like [emotion of massage]:
            main topic of article: ${input}
            emotion of massage: ${type}`:

            `Write a blog post with hight demand SED keyword that talk about [main topic of article] that article should feeling like [emotion of massage]:
            main topic of article: ${input}
            emotion of massage: ${type}`
    return prompt
}

export default CreateArticle