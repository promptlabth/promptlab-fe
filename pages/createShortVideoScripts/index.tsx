import { t } from "@/components/language";
import TableComponents from "@/components/tableComponnets/TableComponents";
import { useLanguage } from "@/language/ LanguageContext";

const CreateShortVideoScripts = () => {
    const { language } = useLanguage();
    return (
        <TableComponents
            titlePage={t("navbar.title.createScripts",language)}
            modelConfig={{
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                maxToken: 4000
            }}
            promptEn={(input: string, type: string) => getPromtforSellingPostEn(input, type)}
            promptTh={(input: string, type: string) => getPromtforSellingPostTh(input, type)} />);

}


const getPromtforSellingPostEn = (input: string, type: string): string => {
    return `
    ### Instruction ###
    write scripts for short video that talk about [short video content] and the feeling of scripts is [emotional of content]:
    short video content: ${input}
    emotional of content ${type}
    `;
}

const getPromtforSellingPostTh = (input: string, type: string): string => {
    return `
    ### Instruction ###
    write scripts for short video that talk about [short video content] and the feeling of scripts is [emotional of content] in Thai:
    short video content: ${input}
    emotional of content ${type}
    `;
}

export default CreateShortVideoScripts