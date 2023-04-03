import TableComponents from "@/components/tableComponnets/TableComponents";

const CreateSellingPost = () => {
    return (
        <TableComponents 
        titlePage = {"Create Your Selling Post"}
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
    Write a social media announcement about [product] and the feeling of message is [emotional of massage]:
    product: ${input}
    emotional of massage ${type}
    `;
}

const getPromtforSellingPostTh = (input: string, type: string): string => {
    return `
    ### Instruction ###
    Write a social media announcement about [product] and the feeling of message is [emotional of massage] in Thai:
    product: ${input}
    emotional of massage ${type}
    `;
}

export default CreateSellingPost