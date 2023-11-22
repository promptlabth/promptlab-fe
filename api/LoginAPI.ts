import { serverApiUrl } from "@/constant";
import axios from "axios";

export async function Login(accessToken : string) {
   const apiUrl = `${serverApiUrl}/users/login`
   
   try {
      const requestOption = { headers: { "Authorization": `Bearer ${accessToken}` },}
      const response = await axios.post(apiUrl, {}, requestOption);
      return response

   } catch (error) {
      console.error(error);
   }
}