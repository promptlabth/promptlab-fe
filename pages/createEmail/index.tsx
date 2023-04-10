import { t } from "@/components/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/language/ LanguageContext";
import Head from "next/head";
const CreateEmail = () => {
    const { language } = useLanguage();
    return (
        <div>
            <Head>
                <title>{t('navbar.title.createEmail', language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <TableComponents
                titlePage={t('navbar.title.createEmail', language)}
                modelConfig={{
                    model: "gpt-3.5-turbo",
                    temperature: 0.7,
                    maxToken: 4000
                }}
                promptEn={(input: string, type: string) => getPromtforEmailtEn(input, type)}
                promptTh={(input: string, type: string) => getPromtforEmailTh(input, type)} />
        </div>
    );

}


const getPromtforEmailtEn = (input: string, type: string): string => {
    return `
    Write bussiness email about [reason for email] that email should feeling like [emotion of massage]:
    reason for email: ${input}
    emotion of massage: ${type}
    `;
}

const getPromtforEmailTh = (input: string, type: string): string => {
    return `    
    Write bussiness email about [input] that email should feeling like [type] in Thai language:
    reason for email: ${input}
    emotion of massage: ${type}`;
}

export default CreateEmail