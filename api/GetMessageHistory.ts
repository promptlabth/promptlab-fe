import { serverApiUrl } from '@/constant';
import axios from 'axios';
import { GetAccessToken } from './auth/auth_get_token';

async function getMessageHistoryWithUserId() {
    // const apiUrl = `https://dev---prompt-lab-be-uu4qhhj35a-as.a.run.app/get-caption`
    const apiUrl = `${serverApiUrl}/get-caption`
    try {

        const accessToken = await GetAccessToken()
        const requestOption = { 
            headers: { 
                "Authorization": `Bearer ${accessToken}`,
                "RefreshToken": `Bearer ${localStorage.getItem("rt")}`
            },
        }
        const response = await axios.get(
            apiUrl,
            // UserGenerateMessage,
            requestOption
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return 'Error Please try again'
    }
}

export { getMessageHistoryWithUserId }
