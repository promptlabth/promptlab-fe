import axios from 'axios';
import { UserGenerateMessage , GenerateMessage, OldGenerateMessage, OldUserGenerateMessage} from '@/models';
import { serverApiUrl } from '@/constant';

async function generateMessageWithUser(UserGenerateMessage: UserGenerateMessage) {
    const apiUrl = `${serverApiUrl}/generate-random`
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
        return { reply: 'Error Please try again'}
    }
}


async function generateMessage(GenerateMessage: GenerateMessage) {
    const apiUrl = `${serverApiUrl}/generate-random-free`
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
        return { reply: 'Error Please try again'}
    }

}

export { generateMessageWithUser, generateMessage,}
