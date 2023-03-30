import TableComponents from "@/components/TableComponents";

const CreateShortVideoScripts = () => {
    return (
        <TableComponents modelConfig={{
            model: "gpt-3.5-turbo",
            temperature: 0.5,
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