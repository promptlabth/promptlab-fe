import axios from "axios";

export async function Login(accessToken : string, platform : string, platformToken : string) {
   const apiUrl = `https://prompt-lab-be-uu4qhhj35a-as.a.run.app/users/login`
   // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}users/login`
   
   try {
      const requestOption = { headers: { "Authorization": `Bearer ${accessToken}` },}
      const response = await axios.post(apiUrl, {
         platform,
         accessToken: platformToken
      }, requestOption);
      return response

   } catch (error) {
      console.error(error);
   }
}