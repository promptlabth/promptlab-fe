import axios from "axios";
import { serverApiUrl, paymentApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";

// Shared axios instances for the two backends.
export const serverApi = axios.create({ baseURL: serverApiUrl });
export const paymentApi = axios.create({ baseURL: paymentApiUrl });

// Builds the Authorization header from an explicit token,
// or from the current Firebase user when no token is given.
export async function buildAuthHeader(accessToken?: string) {
  const token = accessToken ?? (await getAccessToken());
  return { Authorization: `Bearer ${token}` };
}

// Builds the axios request options carrying the Firebase Bearer auth header.
export async function buildAuthRequestOptions(accessToken?: string) {
  return { headers: await buildAuthHeader(accessToken) };
}
