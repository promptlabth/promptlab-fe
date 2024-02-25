import { translate } from "@/languages/language";
import GenerateComponent from "@/components/GenerateComponent";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
const CreateShortVideoScripts = () => {
    const { t, i18n } = useTranslation()
    return (
        <div>
            <Head>
                <title>{t("createScripts.title")}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <GenerateComponent
                titlePage="createScripts.title"
                titleDescription="createScripts.description"
                prompt={(input: string, type: string) => getPrompt(input, type, i18n.language)}
            />
        </div>
    );

}

const getPrompt = (input: string, type: string, language: string): string => {
    switch (language) {
        case 'en':
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}]:`;
        case 'th':
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}] [เป็นภาษาไทยเท่านั้น]:`;
        case 'id':
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}] [in Bahasa Indonesia Only]:`;
        default:
            return `write full scripts for short video that talk about [${input}] and the feeling of scripts is [${type}]:`;
    }
};

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});


export default CreateShortVideoScripts