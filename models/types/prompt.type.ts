export type Prompt = {
  input: string;
  tone_id: number;
  message: string;
  isGenerating: boolean;
};

export type PromptMessage = {
  id: number;
  date_time: Date;
  input_message: string;
  result_message: string;
  user_id: number;
  tone_id: number;
  tone?: string;
  feature_id: number;
  feature?: number;
};
