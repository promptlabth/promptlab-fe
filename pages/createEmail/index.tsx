import TableComponents from "@/components/TableComponents";

const CreateEmail = () => {
    return (
        <TableComponents modelConfig={{
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            maxToken: 4000
        }}
            promptEn={(input: string, type: string) => getPromtforEmailtEn(input, type)}
            promptTh={(input: string, type: string) => getPromtforEmailTh(input, type)} />);

}


const getPromtforEmailtEn = (input: string, type: string): string => {
    return `
    ### Instruction ###
    Write bussiness email about [reason for email] that email should feeling like [emotion of massage]:
    reason for email: ${input}
    emotion of massage: ${type}
    `;
}

const getPromtforEmailTh = (input: string, type: string): string => {
    return `    
    ### Instruction ###
    Write bussiness email about [input] that email should feeling like [type] in Thai:
    reason for email: ${input}
    emotion of massage: ${type}`;
}

export default CreateEmail