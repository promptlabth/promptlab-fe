import axios from "axios";

export async function Login(access_token : string) {
   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`
   
   try {
      const requestOption = { headers: { "Authorization": `Bearer ${"access_token"}` },}
      const response = await axios.get(apiUrl, requestOption);
      console.log(response.data)
      return response.data

   } catch (error) {
      console.error(error);
   }
}