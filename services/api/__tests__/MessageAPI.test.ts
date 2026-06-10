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

import { serverApi } from "@/services/api/ApiClient";
import {
  apiGetGeneratedMessageCount,
  apiGetMaxMessages,
} from "@/services/api/MessageAPI";

const mockedGet = serverApi.get as jest.Mock;
const authOptions = {
  headers: { Authorization: "Bearer firebase-test-token" },
};

describe("MessageAPI", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("requests /user/remaining-message with the auth header", async () => {
    mockedGet.mockResolvedValue({ status: 200, data: 42 });

    await expect(apiGetGeneratedMessageCount()).resolves.toBe(42);
    expect(mockedGet).toHaveBeenCalledWith(
      "/user/remaining-message",
      authOptions,
    );
  });

  it("returns null when the remaining-message request fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockedGet.mockRejectedValue(new Error("network down"));

    await expect(apiGetGeneratedMessageCount()).resolves.toBeNull();

    consoleSpy.mockRestore();
  });

  it("requests the fixed /user/max-message route with the auth header", async () => {
    mockedGet.mockResolvedValue({ status: 200, data: { max_messages: 50 } });

    await expect(apiGetMaxMessages()).resolves.toEqual({ max_messages: 50 });
    expect(mockedGet).toHaveBeenCalledWith("/user/max-message", authOptions);
  });

  it("falls back to an error reply when the max-message request fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockedGet.mockRejectedValue(new Error("network down"));

    await expect(apiGetMaxMessages()).resolves.toEqual({
      reply: "Error Please try again",
    });

    consoleSpy.mockRestore();
  });
});
