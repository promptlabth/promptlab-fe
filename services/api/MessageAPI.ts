import axios from "axios";
import { serverApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";
async function apiGetGeneratedMessageCount() {
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
    return { reply: "Error Please try again" };
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
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
