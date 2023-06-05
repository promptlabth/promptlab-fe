import axios from "axios";
import { Language } from "@/contexts/LanguageContext";

export async function ListTones(language : Language) {
   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/tones/${language}`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}