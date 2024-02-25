import GenerateComponent from "@/components/GenerateComponent";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const CreateClickBaitWord = () => {
    const { t, i18n } = useTranslation()
    return (
        <div>
            <Head>
                <title>{t('createClickBait.title')}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <GenerateComponent
                titlePage="createClickBait.title"
                titleDescription="createClickBait.description"
                prompt={(input: string, type: string) => getPrompt(input, type, i18n.language)}
            />
        </div>
    );

}


const getPrompt = (input: string, type: string, language: string): string => {
    switch (language) {
        case 'en':
            return `Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:`;
        case 'th':
            return `"Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience [เป็นภาษาไทยเท่านั้น]`;
        case 'id':
            return `Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience [in Bahasa Indonesia Only]`;
        default:
            return `Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [${input}] And Look [${type}] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:`;
    }
};

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
 });
 

export default CreateClickBaitWord