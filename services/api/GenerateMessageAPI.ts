import { serverApi, buildAuthRequestOptions } from "./ApiClient";
import { GenerateMessageRequest } from "@/models/types/dto/requests/GeneratedMessageRequest.type";

export async function apiGenerateMessage(
  generateMessageRequest: GenerateMessageRequest,
) {
  try {
    const response = await serverApi.post(
      "/generate/messages",
      generateMessageRequest,
      await buildAuthRequestOptions(),
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}
