import { translate } from "@/languages/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";
const CreateContent = () => {
    const { language } = useLanguage();
    return (
        <div>
            <Head>
                <title>{translate('createContents.title', language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage="createContents.title"
                titleDescription="createContents.description"
                modelConfig={{
                    model: "gpt-3.5-turbo",
                    temperature: 0.7,
                    maxToken: 4000
                }}
                promptEn={(input: string, type: string) => getPromtforIdeaContentEn(input, type)}
                promptTh={(input: string, type: string) => getPromtforIdeaContentTh(input, type)} />
        </div>
    );

}


const getPromtforIdeaContentEn = (input: string, type: string): string => {
    return `
    Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
    show list of idea with short biref:
    `;
}

const getPromtforIdeaContentTh = (input: string, type: string): string => {
    return `    
    Create list of idea content with short biref about [${input}] that all content should make feeling like [${type}] 
    Show list of idea with short biref [เป็นภาษาไทยเท่านั้น]:
    `;
}

export default CreateContent