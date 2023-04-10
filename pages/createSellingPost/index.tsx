import { t } from "@/components/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/language/ LanguageContext";
import Head from "next/head";
const CreateSellingPost = () => {
    const { language } = useLanguage();
    return (
        <div>
            <Head>
                <title>{t('navbar.title.sellingPost', language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage={t('navbar.title.sellingPost', language)}
                modelConfig={{
                    model: "gpt-3.5-turbo",
                    temperature: 0.7,
                    maxToken: 4000
                }}
                promptEn={(input: string, type: string) => getPromtforSellingPostEn(input, type)}
                promptTh={(input: string, type: string) => getPromtforSellingPostTh(input, type)} 
            />
        </div>
    );

}


const getPromtforSellingPostEn = (input: string, type: string): string => {
    return `
    Write a social media announcement about [product] and the feeling of message is [emotional of massage]:
    product: ${input}
    emotional of massage ${type}
    `;
}

const getPromtforSellingPostTh = (input: string, type: string): string => {
    return `
    Write a social media announcement about [product] and the feeling of message is [emotional of massage] in Thai:
    product: ${input}
    emotional of massage ${type}
    `;
}

export default CreateSellingPost