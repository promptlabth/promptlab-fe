import { Configuration, OpenAIApi } from 'openai'
// const API_URL = "https://api.openai.com/v1/completions";
// const API_KEY = process.env.openAPI_KEY;

const gennerateMassage = async (config: openApiConfig) => {
    const configuration = new Configuration({
        apiKey: process.env.openAPI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    try {
        const response = await openai.createChatCompletion({
            model: config.model,
            messages : [
                {"role": "user", "content": config.isTh ? config.promptTh : config.promptEn}
            ],
            temperature: config.temperature,
            max_tokens: config.maxToken,
        });

        const message = response.data.choices[0].message?.content;
        return message
    }
    catch (error) {
        console.error(error);
        return 'Error Please try again'
    }
}

export type openApiConfig = {
    model: string;
    temperature: number;
    maxToken: number;
    promptEn: string;
    promptTh: string;
    isTh: boolean;
}


export default gennerateMassage