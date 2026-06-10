import axios from "axios";

jest.mock("axios", () => {
  const mockInstance = { get: jest.fn(), post: jest.fn(), delete: jest.fn() };
  return {
    __esModule: true,
    default: { create: jest.fn(() => mockInstance) },
  };
});

jest.mock("@/constants/link.constant", () => ({
  serverApiUrl: "https://server.example.test/v1",
  paymentApiUrl: "https://payment.example.test",
}));

jest.mock("@/services/firebase/auth/GetTokenAuth", () => ({
  getAccessToken: jest.fn().mockResolvedValue("firebase-test-token"),
}));

import {
  buildAuthHeader,
  buildAuthRequestOptions,
} from "@/services/api/ApiClient";
import { getAccessToken } from "@/services/firebase/auth/GetTokenAuth";

describe("ApiClient", () => {
  it("creates the server instance with the server base URL", () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "https://server.example.test/v1",
    });
  });

  it("creates the payment instance with the payment base URL", () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "https://payment.example.test",
    });
  });

  it("never configures a base URL with a trailing slash (no double-slash URLs)", () => {
    const baseUrls = (axios.create as jest.Mock).mock.calls.map(
      ([options]) => options.baseURL,
    );
    expect(baseUrls).toHaveLength(2);
    baseUrls.forEach((baseUrl: string) => {
      expect(baseUrl.endsWith("/")).toBe(false);
    });
  });

  it("builds the bearer header from an explicit token without touching Firebase", async () => {
    await expect(buildAuthHeader("explicit-token")).resolves.toEqual({
      Authorization: "Bearer explicit-token",
    });
    expect(getAccessToken).not.toHaveBeenCalled();
  });

  it("builds the bearer header from the Firebase user when no token is given", async () => {
    await expect(buildAuthRequestOptions()).resolves.toEqual({
      headers: { Authorization: "Bearer firebase-test-token" },
    });
    expect(getAccessToken).toHaveBeenCalledTimes(1);
  });
});
