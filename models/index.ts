export type LoginUser = {
   id?: number;
   firebase_id?: string;
   name?: string;
   email: string;
   profilepic: string;
   plan_id?: number;
   planType: string;
   manMessage?: number;
   start_date?: Date;
   end_date?: Date;
}



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