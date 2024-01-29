import { translate } from "@/languages/language";
import TableComponents from "@/components/GenerateComponent";
import {  Language, useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";

const CreateClickBaitWord = () => {
    const { language } = useLanguage();
    return (
        <div>
            <Head>
                <title>{translate('createClickBait.title', language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage="createClickBait.title"
                titleDescription="createClickBait.description"
                prompt={(input: string, type: string) => getPrompt(input, type, language)}
            />
        </div>
    );

}


const getPrompt = (input: string, type: string, language: Language): string => {
    switch (language) {
        case 'eng':
            return `Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:`;
        case 'th':
            return `"Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience [เป็นภาษาไทยเท่านั้น]`;
        case 'id':
            return `Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience [in Bahasa Indonesia Only]`;
        default:
            return `Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:`;
    }
};

export default CreateClickBaitWord