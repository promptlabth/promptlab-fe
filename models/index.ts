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

// Define a type for prompt payload
// @Attribute
// promptPayload: Represents the payload data for a prompt that will send to OpenAI.
// It is an object with the following properties:
// - prompt: A string representing the prompt message.
// - input: A string representing the input data.
// - type: A string representing the type of data.
export type promptPayload = {
   prompt: string;
   input: string;
   type: string;
}

