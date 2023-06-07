import axios from "axios";
import { User } from "@/models";
export async function ListTones() {
   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`
   
   try {
      const requestOption = { headers: { "Content-Type": "application/json" },}
    //   const response = await axios.get(apiUrl, requestOption);
    //   return response.data

   } catch (error) {
      console.error(error);
   }
}