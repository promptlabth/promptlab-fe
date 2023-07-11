import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { Language, useLanguage } from "@/contexts/LanguageContext";
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
                getPrompt={(input: string, type: string) => getPromptForShortVideoScripts(input, type, language)}
            />
        </div>
    );

}
export function getPromptForShortVideoScripts(input: string, type: string, language : Language): string {
    const prompt =
        language === "th" ?
            `write scripts for short video that talk about [short video content] and the feeling of scripts is [emotional of content] in Thai:
            short video content: ${input}
            emotional of content ${type}`:
        language === "eng" ?
            `write scripts for short video that talk about [short video content] and the feeling of scripts is [emotional of content]:
            short video content: ${input}
            emotional of content ${type}`:
            
            `write scripts for short video that talk about [short video content] and the feeling of scripts is [emotional of content]:
            short video content: ${input}
            emotional of content ${type}`
    return prompt
}

const getPromtforSellingPostEn = (input: string, type: string): string => {
    return `
    write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}]:
    `;
}

const getPromtforSellingPostTh = (input: string, type: string): string => {
    return `
    write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}] [เป็นภาษาไทยเท่านั้น]:
    `;
}

export default CreateShortVideoScripts