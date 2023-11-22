import axios from "axios";
import { Language } from "@/contexts/LanguageContext";
import { serverApiUrl } from "@/constant";

export async function ListTones(language : Language) {
   const apiUrl = `${serverApiUrl}/tones/${language}`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}

export async function GetTonesByID(id : number) {
   const apiUrl = `${serverApiUrl}/tone/${id}`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}