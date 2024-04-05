import axios from 'axios';
import { serverApiUrl } from '@/constant';

export async function facebookGetPublicPages(access_token: string) {
    const apiUrl = `https://graph.facebook.com/v19.0/me/accounts?access_token=${access_token}`
    try {
        if (!access_token) {
            throw new Error("Access Token is required")
        }

        const response = await axios.get(apiUrl);
        return response.data

    } catch (error) {
        console.error(error)
    }
}

export async function facebookGetPagePost(id : string, access_token: string) {
    const apiUrl = `https://graph.facebook.com/v19.0/${id}/feed?access_token=${access_token}`
    try {
        if (!access_token || !id) {
            throw new Error("Access Token and Page ID is required")
        }
        const response = await axios.get(apiUrl);            
        return response.data

    } catch (error) {
        console.error(error)
    }
}