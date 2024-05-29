// /* 
// https://api-prod.promptlabai.com/api/v1/get-config-orch/all-configs
// */

// import axios from "axios";
// import { Response } from "@/models/types/dto/standard.response";
// import { Config } from "@/models/types/dto/responses/configResponse.type";
// export async function apiGetAllConfigs(): Promise<Response<Config>> {
//     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-config-orch/all-configs`;
//     try {
//         const response = await axios.get(apiUrl);
//         const responseData: Response<Config> = response.data;
//         if (responseData.status !== 200 || responseData.code !== 2000) {
//             throw new Error(responseData.message);
//         }
//         return responseData;
//     } catch (error) {
//         console.error(error);
//         // You might want to handle errors here, e.g., throw an error or return a default response
//         throw error; // Rethrowing the error for now
//     }
// }