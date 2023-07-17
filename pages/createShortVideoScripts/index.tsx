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
                prompt={(input: string, type: string) => getPrompt(input, type, language)}
            />
        </div>
    );

}

const getPrompt = (input: string, type: string, language: 'eng' | 'th' | 'id'): string => {
    if (language === 'eng') {
        return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}]:`
    } else if (language === 'th') {
        return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}] [เป็นภาษาไทยเท่านั้น]:`
    } else if (language === 'id') {
       return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}] [in Bahasa Indonesia Only]:`
    }
 
    return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}]:`
 };
 

export default CreateShortVideoScripts