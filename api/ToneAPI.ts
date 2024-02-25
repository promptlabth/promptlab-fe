import axios from "axios";
import { serverApiUrl } from "@/constant";

export async function ListTones(language : string) {
   const apiUrl = `${serverApiUrl}/tones/${language}`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}
