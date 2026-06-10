import { serverApi, buildAuthRequestOptions } from "./ApiClient";
import { LoginResponse } from "@/models/types/dto/responses/loginResponse.type";

export async function apiUserLogin(
  accessToken: string,
  platform: string,
  platformToken: string,
): Promise<LoginResponse | null> {
  try {
    const requestBody = {
      platform,
      access_token: platformToken,
    };

    const response = await serverApi.post(
      "/login",
      requestBody,
      await buildAuthRequestOptions(accessToken),
    );
    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
