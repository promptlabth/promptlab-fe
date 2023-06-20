import { CreateImageRequestSizeEnum } from "openai";

// Define an interface for User data
// @Properties
// - id: An optional field representing the user's ID. It is of type number.
// - uid: An optional field representing the user's UID (unique identifier). It is of type string.
// - name: An optional field representing the user's name. It is of type string.
// - email: A required field representing the user's email. It is of type string.
// - profilepic: A required field representing the URL of the user's profile picture. It is of type string.
export type LoginUser = {
   id?: number;
   firebase_id?: string;
   name?: string;
   email: string;
   profilepic: string;
}

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


export type UserGenerateMessage = {
   user_id?: string;
   prompt: string;
   model: string;
   input_message: string;
   tone_id: number;
   feature_id: number;
}