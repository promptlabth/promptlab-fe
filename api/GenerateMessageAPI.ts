import axios from 'axios';
import { ImproveCaptionsRequest, UserGenerateMessage } from '@/models/promptMessages';
import { oldServerApiUrl, serverApiUrl } from '@/constant';
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
    const apiUrl = `${serverApiUrl}/user/remaining-message`
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

    const apiUrl = `${serverApiUrl}/generate/messages`
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
export { generateMessageWithUser, getCountMessages, getRemainingMessage, generateImproveCaption }