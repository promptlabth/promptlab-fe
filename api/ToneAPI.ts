import axios from "axios";
import { Language } from "@/contexts/LanguageContext";

export async function ListTones(language : Language) {
   const apiUrl = `https://prompt-lab-be-dev-uu4qhhj35a-as.a.run.app/tones/${language}`
   // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}tones/${language}`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}