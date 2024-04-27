import axios from "axios";
import { serverApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";
import { GenerateMessageRequest } from "@/models/types/dto/requests/GeneratedMessageRequest.type";
export async function generateMessage(
  generateMessageRequest: GenerateMessageRequest,
) {
  const apiUrl = `${serverApiUrl}/generate/messages`;
  try {
    const accessToken = await getAccessToken();
    const requestOption = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(
      apiUrl,
      generateMessageRequest,
      requestOption,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}
