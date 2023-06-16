import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
const CreateShortVideoScripts = () => {
    const { language } = useLanguage();
    return (
        <div>
            <Head>
                <title>{translate("createScripts.title", language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage="createScripts.title"
                titleDescription="createScripts.description"
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
    write scripts for short video that talk about [short video content] and the feeling of scripts is [emotional of content]:
    short video content: ${input}
    emotional of content ${type}
    `;
}

const getPromtforSellingPostTh = (input: string, type: string): string => {
    return `
    write scripts for short video that talk about [short video content] and the feeling of scripts is [emotional of content] in Thai:
    short video content: ${input}
    emotional of content ${type}
    `;
}

export default CreateShortVideoScripts