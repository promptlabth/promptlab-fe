export type Prompt = {
    input: string;
    tone_id: number;
    message: string;
    isGenerating: boolean;
};

export type GenerateMessage = {
    input_message: string;
    tone_id: number;
    feature_id: number;
 }
 

 export type UserGenerateMessage = {
    user_id?: string;
    input_message: string;
    tone_id: number;
    feature_id: number;
 }
 