import { CreateImageRequestSizeEnum } from "openai";
import { StringLiteral } from "typescript";

// Define an interface for User data
// @Properties
// - id: An optional field representing the user's ID. It is of type number.
// - uid: An optional field representing the user's UID (unique identifier). It is of type string.
// - name: An optional field representing the user's name. It is of type string.
// - email: A required field representing the user's email. It is of type string.
// - profilepic: A required field representing the URL of the user's profile picture. It is of type string.
export type LoginUser = {
   id?: number;
   uid?: string;
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


//todo : A upcoming new openApiMassageConfig type
//    model: string;
//    temperature: number;
//    maxToken: number;
//    promptEn: promptPayload;
//    promptTh: promptPayload;
//    isTh: boolean;

export type openApiMassageConfig = {
   model: string;
   temperature: number;
   maxToken: number;
   promptEn: string;
   promptTh: string;
   isTh: boolean;
}

// user_id: str # firebase ID
// prompt: str
// model: str
// input_message: str
// tone_id: int
// feature_id: int
export type UserGenerateMessage = {
   user_id?: string;
   prompt: string;
   model: string;
   input_message: string;
   tone_id: number;
   feature_id: number;
}