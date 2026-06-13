// Types mirroring the /v1/admin API contract exactly.

// reason explains a denied result without leaking the allowlist:
// ok | no_allowlist_configured | no_email_claim | email_not_trusted |
// email_not_in_allowlist
export type AdminMeReason =
  | "ok"
  | "no_allowlist_configured"
  | "no_email_claim"
  | "email_not_trusted"
  | "email_not_in_allowlist";

export type AdminMeResponse = {
  is_admin: boolean;
  email: string;
  reason?: AdminMeReason;
  email_verified?: boolean | null;
  sign_in_provider?: string | null;
  allowlist_configured?: boolean | null;
};

export type AdminOverviewUsers = {
  total: number;
  new_today: number;
  new_this_month: number;
};

export type AdminOverviewPlanCount = {
  plan_id: number;
  plan_type: string;
  count: number;
};

export type AdminOverviewSubscriptions = {
  active_paid: number;
  by_plan: AdminOverviewPlanCount[];
  expiring_in_7_days: number;
};

export type AdminOverviewGenerations = {
  today: number;
  this_month: number;
  total: number;
};

export type AdminOverviewActiveUsers = {
  today: number;
  this_month: number;
};

export type AdminOverviewResponse = {
  users: AdminOverviewUsers;
  subscriptions: AdminOverviewSubscriptions;
  generations: AdminOverviewGenerations;
  active_users: AdminOverviewActiveUsers;
};

export type AdminUserItem = {
  id: number;
  firebase_id: string | null;
  name: string | null;
  email: string | null;
  platform: string | null;
  plan_id: number | null;
  plan_type: string | null;
  balance_message: number | null;
  max_messages: number | null;
  stripe_id: string | null;
  created_at: string | null;
  last_active_at: string | null;
};

export type AdminUsersResponse = {
  total: number;
  page: number;
  page_size: number;
  items: AdminUserItem[];
};

export type AdminUserSubscription = {
  sub_date: string | null;
  end_sub_date: string | null;
  monthly: boolean | null;
};

export type AdminRecentGeneration = {
  id: number;
  date_time: string;
  feature_id: number | null;
  tone_name: string | null;
  input_excerpt: string;
};

export type AdminUserDetailResponse = {
  user: AdminUserItem;
  subscription: AdminUserSubscription;
  recent_generations: AdminRecentGeneration[];
};

export type AdminPatchUserBody = {
  plan_id?: number;
  reset_balance?: boolean;
};

export type AdminPatchUserResponse = {
  user: AdminUserItem;
};

export type AdminSubscriptionStatus = "all" | "active" | "expiring";

export type AdminSubscriptionItem = {
  id: number;
  name: string | null;
  email: string | null;
  plan_id: number | null;
  plan_type: string | null;
  stripe_id: string | null;
  sub_date: string | null;
  end_sub_date: string | null;
  monthly: boolean | null;
};

export type AdminSubscriptionsResponse = {
  total: number;
  page: number;
  page_size: number;
  items: AdminSubscriptionItem[];
};

export type AdminDailyAnalyticsPoint = {
  date: string; // YYYY-MM-DD
  generations: number;
  active_users: number;
  new_users: number;
};

export type AdminDailyAnalyticsResponse = {
  days: AdminDailyAnalyticsPoint[];
};

export type AdminMonthlyAnalyticsPoint = {
  month: string; // YYYY-MM
  generations: number;
  active_users: number;
  new_users: number;
};

export type AdminMonthlyAnalyticsResponse = {
  months: AdminMonthlyAnalyticsPoint[];
};

export type AdminFeatureAnalyticsItem = {
  feature_id: number;
  feature_name: string | null;
  generations: number;
  unique_users: number;
};

export type AdminToneAnalyticsItem = {
  tone_id: number;
  tone_name: string | null;
  generations: number;
};

export type AdminFeaturesAnalyticsResponse = {
  features: AdminFeatureAnalyticsItem[];
  tones: AdminToneAnalyticsItem[];
};
