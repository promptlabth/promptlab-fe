import axios from 'axios';
import { UserGenerateMessage , GenerateMessage} from '@/models';

async function generateMessageWithUser(UserGenerateMessage: UserGenerateMessage) {
    const apiUrl = "https://prompt-lab-be-uu4qhhj35a-as.a.run.app/gennerate-with-user"
    try {

        const requestOption = { 
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("at")}`,
                "RefreshToken": `Bearer ${localStorage.getItem("rt")}`
            },
        }
        const response = await axios.post(
            apiUrl,
            UserGenerateMessage,
            requestOption
        );
        
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return 'Error Please try again'
    }
}

async function generateMessage(GenerateMessage: GenerateMessage) {
    const apiUrl = "https://prompt-lab-be-uu4qhhj35a-as.a.run.app/gennerate"
    try {

        const requestOption = { 
            headers: { "Content-Type": "application/json" },
        }
        const response = await axios.post(
            apiUrl,
            GenerateMessage,
            requestOption
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return 'Error Please try again'
    }

}


export { generateMessageWithUser, generateMessage }
