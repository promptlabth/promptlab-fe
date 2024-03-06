import axios from 'axios';
import { ImproveCaptionsRequest, UserGenerateMessage } from '@/models/promptMessages';
import { serverApiUrl } from '@/constant';
import { GetAccessToken } from './auth/auth_get_token';

async function generateMessageWithUser(UserGenerateMessage: UserGenerateMessage) {
    const apiUrl = `${serverApiUrl}/generate/messages`
    try {

        const accessToken = await GetAccessToken()
        const requestOption = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
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
        return { reply: 'Error Please try again' }
    }
}

async function getMaxMessage() {
    const apiUrl = `${serverApiUrl}/max-message`
    try {
        const accessToken = await GetAccessToken()
        const requestOption = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        }
        const response = await axios.get(
            apiUrl,
            requestOption
        );
    } catch (error) {
        console.error(error);
        return { reply: 'Error Please try again' }
    }
}

async function getCountMessages() {
    const apiUrl = `${serverApiUrl}/get-count-message`
    try {
        const accessToken = await GetAccessToken()

        const requestOption = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        }
        const response = await axios.get(
            apiUrl,
            requestOption
        );

    } catch (error) {
        console.error(error);
        return { reply: 'Error Please try again' }
    }

}

async function getRemainingMessage() {
    const apiUrl = `https://dev---prompt-lab-be-uu4qhhj35a-as.a.run.app/remaining-message`
    // const apiUrl = `${serverApiUrl}/remaining-message`
    try {
        const accessToken = await GetAccessToken()

        const requestOption = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        }

        const response = await axios.get(
            apiUrl,
            requestOption
        );

        return response.data
    } catch (error) {
        console.error(error);
        return { reply: 'Error Please try again' }
    }
}


async function generateImproveCaption(improveCaptionsRequest: ImproveCaptionsRequest) {

    const apiUrl = `${serverApiUrl}/generate-improve-caption`
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
            improveCaptionsRequest,
            requestOption
        );

        return response.data
    } catch (error) {
        console.error(error);
        return { reply: 'Error Please try again' }
    }

}
export { generateMessageWithUser, getMaxMessage, getCountMessages, getRemainingMessage, generateImproveCaption }