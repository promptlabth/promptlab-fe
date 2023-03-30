import TableComponents from "@/components/TableComponents";

const CreateSellingPost = () => {
    return (
        <TableComponents modelConfig={{
            model: "text-davinci-003",
            temperature: 0.5,
            maxToken: 2000
        }}
            promptEn={(input: string, type: string) => getPromtforSellingPostEn(input, type)}
            promptTh={(input: string, type: string) => getPromtforSellingPostTh(input, type)} />);

}


const getPromtforSellingPostEn = (input: string, type: string): string => {
    return `create post on social media to sell ${input} and the message is ${type}`;
}

const getPromtforSellingPostTh = (input: string, type: string): string => {
    return `create post on social media to sell ${input} and the message is ${type} in Thai`;
}

export default CreateSellingPost