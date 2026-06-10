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
import { apiGetTones } from "@/services/api/ToneAPI";

const mockedGet = serverApi.get as jest.Mock;

describe("ToneAPI", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("requests /tone/{language} with a JSON content type", async () => {
    const tones = [{ id: 1, name: "formal" }];
    mockedGet.mockResolvedValue({ status: 200, data: tones });

    await expect(apiGetTones("th")).resolves.toEqual(tones);
    expect(mockedGet).toHaveBeenCalledWith("/tone/th", {
      headers: { "Content-Type": "application/json" },
    });
  });

  it("returns null for a non-200 response", async () => {
    mockedGet.mockResolvedValue({ status: 204, data: null });

    await expect(apiGetTones("en")).resolves.toBeNull();
  });

  it("returns null when the request fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockedGet.mockRejectedValue(new Error("network down"));

    await expect(apiGetTones("id")).resolves.toBeNull();

    consoleSpy.mockRestore();
  });
});
