import axios from "axios";
import { serverApiUrl } from "@/constant";

export async function apiGetTones(language: string) {
  const apiUrl = `${serverApiUrl}/tone/${language}`;
  try {
    const requestOption = { headers: { "Content-Type": "application/json" } };
    const response = await axios.get(apiUrl, requestOption);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
