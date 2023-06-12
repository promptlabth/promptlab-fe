import axios from "axios";

export async function Login(accessToken : string) {
   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}users/login`
   
   try {
      const requestOption = { headers: { "Authorization": `Bearer ${accessToken}` },}
      const response = await axios.post(apiUrl, requestOption);
      return response.data

   } catch (error) {
      console.error(error);
   }
}