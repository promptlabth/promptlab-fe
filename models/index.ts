export type LoginUser = {
   firebase_id?: string;
   name?: string;
   email: string;
   profilepic: string;
   subscription_status?: string;
   plan_id?: number;
   plan_name?: string;
}

export type OldGenerateMessage = {
   prompt: string;
   model: string;
   input_message: string;
   tone_id: number;
   feature_id: number;
}


export type GenerateMessage = {
   input_message: string;
   tone_id: number;
   feature_id: number;
}


export type OldUserGenerateMessage = {
   user_id?: string;
   prompt: string;
   model: string;
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



export type PromptMessage = {
   id : number;
   date_time : Date;
   input_message : string;
   result_message : string;
   user_id : number;
   tone_id : number;
   tone? : string;
   feature_id : number;
   feature?: number;
}