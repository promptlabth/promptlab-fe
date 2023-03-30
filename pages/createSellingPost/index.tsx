import TableComponents from "@/components/TableComponents";

const CreateSellingPost = () => {
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
    create post on social media for sell [product] and the feeling of message is [emotional of massage]:
    product: ${input}
    emotional of massage ${type}
    `;
}

const getPromtforSellingPostTh = (input: string, type: string): string => {
    return `
    ### Instruction ###
    create post on social media for sell [product] and the feeling of message is [emotional of massage] in Thai:
    product: ${input}
    emotional of massage ${type}
    `;
}

export default CreateSellingPost