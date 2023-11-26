import axios from 'axios';
import { UserGenerateMessage , GenerateMessage } from '@/models';
import { serverApiUrl } from '@/constant';
import { GetAccessToken } from './auth/auth_get_token';

async function generateMessageWithUser(UserGenerateMessage: UserGenerateMessage) {
    const apiUrl = `${serverApiUrl}/generate-random`
    try {

        const accessToken = await GetAccessToken()
        const requestOption = { 
            headers: { 
                "Authorization": `Bearer ${accessToken}`,
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
