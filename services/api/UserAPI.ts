import { serverApiUrl } from "@/constants/link.constant";
import axios from "axios";
import { LoginResponse } from "@/models/types/dto/responses/loginResponse.type";
export async function apiUserLogin(accessToken: string, platform: string, platformToken: string,): Promise<LoginResponse | null> {
  const apiUrl = `${serverApiUrl}/login`;
  try {
    const requestOption = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const requestBody = {
      platform,
      access_token: platformToken,
    }

    const response = await axios.post(apiUrl, requestBody, requestOption);
    if (response.status === 200) {
      return response.data;
    }

    return null
  } catch (error) {
    console.error(error);
    return null
  }
}
