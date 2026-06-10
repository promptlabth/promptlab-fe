import { serverApi, buildAuthRequestOptions } from "./ApiClient";
import {
  AdminDailyAnalyticsResponse,
  AdminFeaturesAnalyticsResponse,
  AdminMeResponse,
  AdminMonthlyAnalyticsResponse,
  AdminOverviewResponse,
  AdminPatchUserBody,
  AdminPatchUserResponse,
  AdminSubscriptionStatus,
  AdminSubscriptionsResponse,
  AdminUserDetailResponse,
  AdminUsersResponse,
} from "@/models/types/admin.type";

export async function apiAdminGetMe(): Promise<AdminMeResponse | null> {
  try {
    const response = await serverApi.get(
      "/admin/me",
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

export async function apiAdminGetOverview(): Promise<AdminOverviewResponse | null> {
  try {
    const response = await serverApi.get(
      "/admin/overview",
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

export async function apiAdminGetUsers(
  page: number,
  pageSize: number,
  search?: string,
  planId?: number,
): Promise<AdminUsersResponse | null> {
  try {
    const params: Record<string, number | string> = {
      page,
      page_size: pageSize,
    };
    if (search) {
      params.search = search;
    }
    if (planId !== undefined && planId !== null) {
      params.plan_id = planId;
    }
    const response = await serverApi.get("/admin/users", {
      ...(await buildAuthRequestOptions()),
      params,
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function apiAdminGetUserDetail(
  id: number,
): Promise<AdminUserDetailResponse | null> {
  try {
    const response = await serverApi.get(
      `/admin/users/${id}`,
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

export async function apiAdminPatchUser(
  id: number,
  body: AdminPatchUserBody,
): Promise<AdminPatchUserResponse | null> {
  try {
    const response = await serverApi.patch(
      `/admin/users/${id}`,
      body,
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

export async function apiAdminGetSubscriptions(
  status: AdminSubscriptionStatus,
  page: number,
): Promise<AdminSubscriptionsResponse | null> {
  try {
    const response = await serverApi.get("/admin/subscriptions", {
      ...(await buildAuthRequestOptions()),
      params: { status, page },
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function apiAdminGetAnalyticsDaily(
  days: number,
): Promise<AdminDailyAnalyticsResponse | null> {
  try {
    const response = await serverApi.get("/admin/analytics/daily", {
      ...(await buildAuthRequestOptions()),
      params: { days },
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function apiAdminGetAnalyticsMonthly(
  months: number,
): Promise<AdminMonthlyAnalyticsResponse | null> {
  try {
    const response = await serverApi.get("/admin/analytics/monthly", {
      ...(await buildAuthRequestOptions()),
      params: { months },
    });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function apiAdminGetAnalyticsFeatures(): Promise<AdminFeaturesAnalyticsResponse | null> {
  try {
    const response = await serverApi.get(
      "/admin/analytics/features",
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
