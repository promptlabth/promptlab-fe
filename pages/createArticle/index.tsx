import { t } from "@/components/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/language/ LanguageContext";
import Head from "next/head";

const CreateArticle = () => {
    const { language } = useLanguage();
    return (
        <div>
            <Head>
                <title>{t('navbar.title.createArticle', language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage={t('navbar.title.createArticle', language)}
                modelConfig={{
                    model: "gpt-4",
                    temperature: 0.7,
                    maxToken: 4000
                }}
                promptEn={(input: string, type: string) => getPromtforEmailtEn(input, type)}
                promptTh={(input: string, type: string) => getPromtforEmailTh(input, type)}
            />
        </div>
    );

}


const getPromtforEmailtEn = (input: string, type: string): string => {
    return `
    Write a blog post with hight demand SED keyword that talk about [main topic of article] that article should feeling like [emotion of massage]:
    main topic of article: ${input}
    emotion of massage: ${type}
    `;
}

const getPromtforEmailTh = (input: string, type: string): string => {
    return `    
    Write a blog post with hight demand SED keyword that talk about [main topic of article] that article should feeling like [emotion of massage] in Thai:
    main topic of article: ${input}
    emotion of massage: ${type}
    `;
}

export default CreateArticle