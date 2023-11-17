import axios from "axios";

export async function Login(accessToken : string) {
   const apiUrl = `https://prompt-lab-be-dev-uu4qhhj35a-as.a.run.app/users/login`
   
   // Product Api url
   // const apiUrl = `https://prompt-lab-be-uu4qhhj35a-as.a.run.app/users/login`
   
   try {
      const requestOption = { headers: { "Authorization": `Bearer ${accessToken}` },}
      const response = await axios.post(apiUrl, {}, requestOption);
      return response

   } catch (error) {
      console.error(error);
   }
}