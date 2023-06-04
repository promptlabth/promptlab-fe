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