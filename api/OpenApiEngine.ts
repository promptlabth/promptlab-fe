import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from 'openai'
const API_KEY_CONFIG = new Configuration({
    apiKey: process.env.openAPI_KEY,
});
// const API_URL = "https://api.openai.com/v1/completions";
// const API_KEY = process.env.openAPI_KEY;

const gennerateMassage = async (config: openApiMassageConfig) => {
    const openai = new OpenAIApi(API_KEY_CONFIG);
    try {
        const response = await openai.createChatCompletion({
            model: config.model,
            messages: [
                { "role": "user", "content": config.isTh ? config.promptTh : config.promptEn }
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

export type GenerateImageResult = {
    success: boolean;
    data: string;
};

export const generateImage = async (config: openApiImageConfig): Promise<GenerateImageResult> => {
    const openai = new OpenAIApi(API_KEY_CONFIG);
    try {
        const response = await openai.createImage({
            prompt: config.isTh ? config.promptTh : config.promptEn,
            size: config.size,
            n: config.numberImage,
        });

        const image_url = response.data.data[0].url ?? "error";
        console.log(image_url);
        return { success: true, data: image_url };
    } catch (error) {
        console.error(error);
        return { success: false, data: 'Error Please try again' };
    }
};

export type openApiImageConfig = {
    promptEn: string;
    promptTh: string;
    numberImage: number;
    isTh: boolean;
    size: CreateImageRequestSizeEnum;
}

export type openApiMassageConfig = {
    model: string;
    temperature: number;
    maxToken: number;
    promptEn: string;
    promptTh: string;
    isTh: boolean;
}


export default gennerateMassage