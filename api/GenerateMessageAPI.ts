import axios from 'axios';
import { UserGenerateMessage } from '@/models';
import { getCookie } from 'cookies-next';

async function generateMessage(UserGenerateMessage: UserGenerateMessage) {
    const apiUrl = "https://prompt-lab-be-dev-uu4qhhj35a-as.a.run.app/gennerate-with-user"
    try {

        const requestOption = { 
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("at")}`,
                "RefreshToken": localStorage.getItem("rt")
            },
        }
        const response = await axios.post(
            apiUrl,
            UserGenerateMessage,
            requestOption
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return 'Error Please try again'
    }
}

export { generateMessage }
