import { translate } from "@/languages/language";
import TableComponents from "@/components/GenerateComponnet";
import {  Language, useLanguage } from "@/contexts/LanguageContext";
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
                prompt={(input: string, type: string) => getPrompt(input, type, language)}
            />
        </div>
    );

}

const getPrompt = (input: string, type: string, language: Language): string => {
    switch (language) {
        case 'eng':
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}]:`;
        case 'th':
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}] [เป็นภาษาไทยเท่านั้น]:`;
        case 'id':
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}] [in Bahasa Indonesia Only]:`;
        default:
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}]:`;
    }
};
 

export default CreateShortVideoScripts