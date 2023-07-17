import axios from "axios";
import { Language } from "@/contexts/LanguageContext";

export async function ListTones(language : Language) {
   const apiUrl = `https://prompt-lab-be-uu4qhhj35a-as.a.run.app/tones/${language}`
   // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}tones/${language}`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}

export async function GetTonesByID(id : number) {
   const apiUrl = `https://prompt-lab-be-uu4qhhj35a-as.a.run.app/tone/${id}`
   // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}tones/${language}`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}