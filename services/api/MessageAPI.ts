import { serverApi, buildAuthRequestOptions } from "./ApiClient";

async function apiGetGeneratedMessageCount(): Promise<number | null> {
  try {
    const response = await serverApi.get(
      "/user/remaining-message",
      await buildAuthRequestOptions(),
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

async function apiGetMaxMessages() {
  try {
    const response = await serverApi.get(
      "/user/max-message",
      await buildAuthRequestOptions(),
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}

export { apiGetGeneratedMessageCount, apiGetMaxMessages };
