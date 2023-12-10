export type LoginUser = {
   id?: number;
   firebase_id?: string;
   name?: string;
   email: string;
   profilepic: string;
   subscriptionId?: number;
   plan_id?: number;
   planType: string;
   maxMessages?: number;
   start_date?: Date;
   end_date?: Date;
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