import axios from 'axios';

export async function getRemainingMessages(accessToken : string) { 
    const apiUrl = `https://prompt-lab-be-uu4qhhj35a-as.a.run.app/remaining-message`
    try {
      const requestOption = { headers: { "Authorization": `Bearer ${accessToken}` },}
      const response = await axios.get(apiUrl, requestOption);
      return response.data.remaining_message

    } catch (error) {
        console.error(error);
    }

}
