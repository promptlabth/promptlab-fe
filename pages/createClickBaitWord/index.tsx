import { t } from "@/components/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/language/ LanguageContext";

const CreateArticle = () => {
    const { language } = useLanguage();
    return (
        <TableComponents 
        titlePage = {t('navbar.title.createClickBait',language)}
        modelConfig={{
            model: "gpt-4",
            temperature: 0.5,
            maxToken: 4000
        }}
            promptEn={(input: string, type: string) => getPromtforEmailtEn(input, type)}
            promptTh={(input: string, type: string) => getPromtforEmailTh(input, type)} />);

}


const getPromtforEmailtEn = (input: string, type: string): string => {
    return `
    Title : ${input}
    emotional message : ${type}
    "Compose a Captivating CClickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [Title] AndLook [emotional message] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience:
    `;
}

const getPromtforEmailTh = (input: string, type: string): string => {
    return `    
    Title : ${input}
    emotional message : ${type}
    "Compose a Captivating Clickbait Sentence but not incloud 'Click' in Sentence for Openning a Short Video To Talk About [Title] AndLook [emotional message] That Instantly Grabs the Viewer's Attention and Sets the Stage for an Unforgettable Experience in Thai:
    `;
}

export default CreateArticle