jest.mock("axios", () => {
  const mockInstance = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
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
  apiAdminGetAnalyticsDaily,
  apiAdminGetAnalyticsFeatures,
  apiAdminGetAnalyticsMonthly,
  apiAdminGetMe,
  apiAdminGetOverview,
  apiAdminGetSubscriptions,
  apiAdminGetUserDetail,
  apiAdminGetUsers,
  apiAdminPatchUser,
} from "@/services/api/AdminAPI";

const mockedGet = serverApi.get as jest.Mock;
const mockedPatch = serverApi.patch as jest.Mock;
const authHeaders = { Authorization: "Bearer firebase-test-token" };
const authOptions = { headers: authHeaders };

describe("AdminAPI", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    mockedGet.mockReset();
    mockedPatch.mockReset();
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("requests /admin/me with the auth header", async () => {
    const me = { is_admin: true, email: "admin@example.test" };
    mockedGet.mockResolvedValue({ status: 200, data: me });

    await expect(apiAdminGetMe()).resolves.toEqual(me);
    expect(mockedGet).toHaveBeenCalledWith("/admin/me", authOptions);
  });

  it("returns null when /admin/me fails (401/403)", async () => {
    mockedGet.mockRejectedValue(new Error("Request failed with status 403"));

    await expect(apiAdminGetMe()).resolves.toBeNull();
  });

  it("requests /admin/overview with the auth header", async () => {
    const overview = {
      users: { total: 10, new_today: 1, new_this_month: 2 },
      subscriptions: { active_paid: 3, by_plan: [], expiring_in_7_days: 0 },
      generations: { today: 5, this_month: 6, total: 7 },
      active_users: { today: 1, this_month: 2 },
    };
    mockedGet.mockResolvedValue({ status: 200, data: overview });

    await expect(apiAdminGetOverview()).resolves.toEqual(overview);
    expect(mockedGet).toHaveBeenCalledWith("/admin/overview", authOptions);
  });

  it("returns null when /admin/overview fails", async () => {
    mockedGet.mockRejectedValue(new Error("network down"));

    await expect(apiAdminGetOverview()).resolves.toBeNull();
  });

  it("requests /admin/users with page and page_size params", async () => {
    const body = { total: 0, page: 2, page_size: 20, items: [] };
    mockedGet.mockResolvedValue({ status: 200, data: body });

    await expect(apiAdminGetUsers(2, 20)).resolves.toEqual(body);
    expect(mockedGet).toHaveBeenCalledWith("/admin/users", {
      headers: authHeaders,
      params: { page: 2, page_size: 20 },
    });
  });

  it("serializes search and plan_id query params when given", async () => {
    mockedGet.mockResolvedValue({
      status: 200,
      data: { total: 0, page: 1, page_size: 50, items: [] },
    });

    await apiAdminGetUsers(1, 50, "jane", 4);

    expect(mockedGet).toHaveBeenCalledWith("/admin/users", {
      headers: authHeaders,
      params: { page: 1, page_size: 50, search: "jane", plan_id: 4 },
    });
  });

  it("omits empty search and undefined plan_id from the query params", async () => {
    mockedGet.mockResolvedValue({
      status: 200,
      data: { total: 0, page: 1, page_size: 20, items: [] },
    });

    await apiAdminGetUsers(1, 20, "", undefined);

    expect(mockedGet).toHaveBeenCalledWith("/admin/users", {
      headers: authHeaders,
      params: { page: 1, page_size: 20 },
    });
  });

  it("returns null when the users listing fails", async () => {
    mockedGet.mockRejectedValue(new Error("network down"));

    await expect(apiAdminGetUsers(1, 20)).resolves.toBeNull();
  });

  it("requests /admin/users/{id} for the user detail", async () => {
    const detail = {
      user: { id: 7 },
      subscription: { sub_date: null, end_sub_date: null, monthly: null },
      recent_generations: [],
    };
    mockedGet.mockResolvedValue({ status: 200, data: detail });

    await expect(apiAdminGetUserDetail(7)).resolves.toEqual(detail);
    expect(mockedGet).toHaveBeenCalledWith("/admin/users/7", authOptions);
  });

  it("returns null when the user detail request fails (404)", async () => {
    mockedGet.mockRejectedValue(new Error("Request failed with status 404"));

    await expect(apiAdminGetUserDetail(999)).resolves.toBeNull();
  });

  it("patches /admin/users/{id} with the plan_id body", async () => {
    const patched = { user: { id: 7, plan_id: 2 } };
    mockedPatch.mockResolvedValue({ status: 200, data: patched });

    await expect(apiAdminPatchUser(7, { plan_id: 2 })).resolves.toEqual(
      patched,
    );
    expect(mockedPatch).toHaveBeenCalledWith(
      "/admin/users/7",
      { plan_id: 2 },
      authOptions,
    );
  });

  it("patches /admin/users/{id} with the reset_balance body", async () => {
    const patched = { user: { id: 7 } };
    mockedPatch.mockResolvedValue({ status: 200, data: patched });

    await expect(
      apiAdminPatchUser(7, { reset_balance: true }),
    ).resolves.toEqual(patched);
    expect(mockedPatch).toHaveBeenCalledWith(
      "/admin/users/7",
      { reset_balance: true },
      authOptions,
    );
  });

  it("returns null when the patch request fails (400)", async () => {
    mockedPatch.mockRejectedValue(new Error("Request failed with status 400"));

    await expect(apiAdminPatchUser(7, { plan_id: 999 })).resolves.toBeNull();
  });

  it("requests /admin/subscriptions with status and page params", async () => {
    const body = { total: 0, page: 3, page_size: 20, items: [] };
    mockedGet.mockResolvedValue({ status: 200, data: body });

    await expect(apiAdminGetSubscriptions("expiring", 3)).resolves.toEqual(
      body,
    );
    expect(mockedGet).toHaveBeenCalledWith("/admin/subscriptions", {
      headers: authHeaders,
      params: { status: "expiring", page: 3 },
    });
  });

  it("returns null when the subscriptions request fails", async () => {
    mockedGet.mockRejectedValue(new Error("network down"));

    await expect(apiAdminGetSubscriptions("all", 1)).resolves.toBeNull();
  });

  it("requests /admin/analytics/daily with the days param", async () => {
    const body = { days: [] };
    mockedGet.mockResolvedValue({ status: 200, data: body });

    await expect(apiAdminGetAnalyticsDaily(30)).resolves.toEqual(body);
    expect(mockedGet).toHaveBeenCalledWith("/admin/analytics/daily", {
      headers: authHeaders,
      params: { days: 30 },
    });
  });

  it("requests /admin/analytics/monthly with the months param", async () => {
    const body = { months: [] };
    mockedGet.mockResolvedValue({ status: 200, data: body });

    await expect(apiAdminGetAnalyticsMonthly(12)).resolves.toEqual(body);
    expect(mockedGet).toHaveBeenCalledWith("/admin/analytics/monthly", {
      headers: authHeaders,
      params: { months: 12 },
    });
  });

  it("requests /admin/analytics/features with the auth header", async () => {
    const body = { features: [], tones: [] };
    mockedGet.mockResolvedValue({ status: 200, data: body });

    await expect(apiAdminGetAnalyticsFeatures()).resolves.toEqual(body);
    expect(mockedGet).toHaveBeenCalledWith(
      "/admin/analytics/features",
      authOptions,
    );
  });

  it("returns null when the analytics requests fail", async () => {
    mockedGet.mockRejectedValue(new Error("network down"));

    await expect(apiAdminGetAnalyticsDaily(30)).resolves.toBeNull();
    await expect(apiAdminGetAnalyticsMonthly(12)).resolves.toBeNull();
    await expect(apiAdminGetAnalyticsFeatures()).resolves.toBeNull();
  });
});
