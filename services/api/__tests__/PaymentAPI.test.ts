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

import { paymentApi } from "@/services/api/ApiClient";
import * as PaymentAPI from "@/services/api/PaymentAPI";
import { CheckoutSessionRequest } from "@/models/types/dto/requests/PaymentRequest.type";

const mockedPost = paymentApi.post as jest.Mock;
const mockedDelete = paymentApi.delete as jest.Mock;
const authOptions = {
  headers: { Authorization: "Bearer firebase-test-token" },
};

describe("PaymentAPI", () => {
  beforeEach(() => {
    mockedPost.mockReset();
    mockedDelete.mockReset();
  });

  it("posts the checkout request to /subscription/get-url and returns the url", async () => {
    const request: CheckoutSessionRequest = {
      PrizeID: "price_123",
      WebUrl: "https://promptlabai.com",
      PlanID: 1,
    };
    mockedPost.mockResolvedValue({
      status: 201,
      data: { url: "https://checkout.example.test/session" },
    });

    await expect(PaymentAPI.apiGetCheckoutSessionUrl(request)).resolves.toBe(
      "https://checkout.example.test/session",
    );
    expect(mockedPost).toHaveBeenCalledWith(
      "/subscription/get-url",
      request,
      authOptions,
    );
  });

  it("cancels the subscription via DELETE /subscription/cancle", async () => {
    mockedDelete.mockResolvedValue({ status: 200, data: { canceled: true } });

    await expect(PaymentAPI.apiCancelUserSubscribe()).resolves.toEqual({
      canceled: true,
    });
    expect(mockedDelete).toHaveBeenCalledWith(
      "/subscription/cancle",
      authOptions,
    );
  });

  it("no longer exposes the removed /subscription/success call", () => {
    expect(
      (PaymentAPI as Record<string, unknown>)["apiUserPremiumSubscribe"],
    ).toBeUndefined();
  });
});
