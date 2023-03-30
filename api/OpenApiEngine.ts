const API_URL = "https://api.openai.com/v1/completions";
const API_KEY = process.env.openAPI_KEY;

const gennerateMassage = async (config: openApiConfig) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: config.model,
                prompt: config.isTh ? config.promptTh : config.promptEn,
                temperature: config.temperature,
                max_tokens: config.maxToken,
            }),
        });
        const data = await response.json();
        const message = data.choices[0].text;
        return message

    } catch (error) {
        console.error(error);
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