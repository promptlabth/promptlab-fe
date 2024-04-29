import axios from "axios";
import { serverApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";
async function apiGetGeneratedMessageCount() : Promise<number | null> {
  const apiUrl = `${serverApiUrl}/user/remaining-message`;
  try {
    const accessToken = await getAccessToken();
    const requestOption = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(apiUrl, requestOption);
    if (response.status === 200) {
      return response.data;
    }
    return null
  } catch (error) {
    console.error(error);
    return null
  }
}

async function apiGetMaxMessages() {
  const apiUrl = `${serverApiUrl}/max-message`;
  try {
    const accessToken = await getAccessToken();

    const requestOption = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(apiUrl, requestOption);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}

export { apiGetGeneratedMessageCount, apiGetMaxMessages };
