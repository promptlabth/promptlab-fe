import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { Language, useLanguage } from "@/contexts/LanguageContext";
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
                modelConfig={{
                    model: "gpt-4",
                    temperature: 0.5,
                    maxToken: 4000
                }}
                prompt={(input: string, type: string) => getPrompt(input, type, language)}
            />
        </div>
    );

}


const getPrompt = (input: string, type: string, language: 'eng' | 'th' | 'id'): string => {
    if (language === 'eng') {
        return `
        Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:
        `;
    } else if (language === 'th') {
        return `
        "Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience [เป็นภาษาไทยเท่านั้น]
        `;
    } else if (language === 'id') {
        return `
        Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience [in Bahasa Indonesia Only]
        `;
    }

    return `
    Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:
    `;
};

export default CreateClickBaitWord