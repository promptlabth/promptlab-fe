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
                getPrompt={(input: string, type: string) => getPromptForClickBaitWord(input, type, language)}
            />
        </div>
    );

}


export function getPromptForClickBaitWord(input: string, type: string, language : Language): string {
    const prompt =
        language === "th" ?
            `Title : ${input}
            emotional message : ${type}
            "Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [Title] AndLook [emotional message] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience in Thai:`:
        
            language === "eng" ?
            `Title : ${input}
            emotional message : ${type}
            "Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [Title] AndLook [emotional message] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:`:
            
            `Title : ${input}
            emotional message : ${type}
            "Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [Title] AndLook [emotional message] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:`
    return prompt
}

const getPromtforEmailtEn = (input: string, type: string): string => {
    return `
    "Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:
    `;
}

const getPromtforEmailTh = (input: string, type: string): string => {
    return `    
    "Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience in [เป็นภาษาไทยเท่านั้น]:
    `;
}

export default CreateClickBaitWord