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
import { apiGenerateMessage } from "@/services/api/GenerateMessageAPI";
import { GenerateMessageRequest } from "@/models/types/dto/requests/GeneratedMessageRequest.type";

const mockedPost = serverApi.post as jest.Mock;

describe("GenerateMessageAPI", () => {
  beforeEach(() => {
    mockedPost.mockReset();
  });

  it("posts the request payload to /generate/messages with the auth header", async () => {
    const request: GenerateMessageRequest = {
      input_message: "hello world",
      tone_id: 1,
      feature_id: 2,
    };
    mockedPost.mockResolvedValue({
      status: 200,
      data: { reply: "generated message" },
    });

    await expect(apiGenerateMessage(request)).resolves.toEqual({
      reply: "generated message",
    });
    expect(mockedPost).toHaveBeenCalledWith("/generate/messages", request, {
      headers: { Authorization: "Bearer firebase-test-token" },
    });
  });

  it("falls back to an error reply when the request fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockedPost.mockRejectedValue(new Error("network down"));

    await expect(
      apiGenerateMessage({ input_message: "x", tone_id: 1, feature_id: 1 }),
    ).resolves.toEqual({ reply: "Error Please try again" });

    consoleSpy.mockRestore();
  });
});
