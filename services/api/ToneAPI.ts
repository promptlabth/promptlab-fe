import { serverApi } from "./ApiClient";

export async function apiGetTones(language: string) {
  try {
    const requestOption = { headers: { "Content-Type": "application/json" } };
    const response = await serverApi.get(`/tone/${language}`, requestOption);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
