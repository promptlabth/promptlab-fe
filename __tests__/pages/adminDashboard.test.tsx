import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

// recharts is client-only (next/dynamic, ssr:false); replace every dynamic
// component with a noop so jsdom never loads the chart library.
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const DynamicNoop = () => null;
    return DynamicNoop;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// The guard has its own tests; here it just passes the page through.
jest.mock("@/common/AdminGuard", () => ({
  AdminGuard: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const mockGetOverview = jest.fn();
const mockGetDaily = jest.fn();
const mockGetMonthly = jest.fn();
const mockGetFeatures = jest.fn();
jest.mock("@/services/api/AdminAPI", () => ({
  apiAdminGetOverview: (...args: unknown[]) => mockGetOverview(...args),
  apiAdminGetAnalyticsDaily: (...args: unknown[]) => mockGetDaily(...args),
  apiAdminGetAnalyticsMonthly: (...args: unknown[]) => mockGetMonthly(...args),
  apiAdminGetAnalyticsFeatures: (...args: unknown[]) => mockGetFeatures(...args),
}));

import AdminDashboardPage from "@/pages/admin/index";

const overviewFixture = {
  users: { total: 1234, new_today: 12, new_this_month: 99 },
  subscriptions: {
    active_paid: 56,
    by_plan: [{ plan_id: 2, plan_type: "Pro", count: 40 }],
    expiring_in_7_days: 3,
  },
  generations: { today: 78, this_month: 901, total: 5000 },
  active_users: { today: 21, this_month: 345 },
};

const dailyFixture = {
  days: [{ date: "2026-06-10", generations: 5, active_users: 2, new_users: 1 }],
};

const monthlyFixture = {
  months: [
    { month: "2026-06", generations: 50, active_users: 20, new_users: 10 },
  ],
};

const featuresFixture = {
  features: [
    {
      feature_id: 1,
      feature_name: "Selling Post",
      generations: 100,
      unique_users: 40,
    },
  ],
  tones: [{ tone_id: 1, tone_name: "Friendly", generations: 60 }],
};

describe("Admin dashboard page", () => {
  beforeEach(() => {
    mockGetOverview.mockReset().mockResolvedValue(overviewFixture);
    mockGetDaily.mockReset().mockResolvedValue(dailyFixture);
    mockGetMonthly.mockReset().mockResolvedValue(monthlyFixture);
    mockGetFeatures.mockReset().mockResolvedValue(featuresFixture);
  });

  it("renders the overview stat card values", async () => {
    render(<AdminDashboardPage />);

    await waitFor(() =>
      expect(screen.getByTestId("stat-ผู้ใช้ทั้งหมด")).toHaveTextContent(
        "1,234",
      ),
    );
    expect(screen.getByTestId("stat-สมาชิกแบบเสียเงิน")).toHaveTextContent(
      "56",
    );
    expect(screen.getByTestId("stat-ข้อความที่สร้างวันนี้")).toHaveTextContent(
      "78",
    );
    expect(
      screen.getByTestId("stat-ข้อความที่สร้างเดือนนี้"),
    ).toHaveTextContent("901");
    expect(screen.getByTestId("stat-ผู้ใช้งานวันนี้")).toHaveTextContent("21");
    expect(screen.getByTestId("stat-ผู้ใช้งานเดือนนี้")).toHaveTextContent(
      "345",
    );
    expect(screen.getByTestId("stat-หมดอายุใน 7 วัน")).toHaveTextContent("3");
  });

  it("requests the analytics ranges from the contract (30 days, 12 months)", async () => {
    render(<AdminDashboardPage />);

    await waitFor(() => expect(mockGetOverview).toHaveBeenCalledTimes(1));
    expect(mockGetDaily).toHaveBeenCalledWith(30);
    expect(mockGetMonthly).toHaveBeenCalledWith(12);
    expect(mockGetFeatures).toHaveBeenCalledTimes(1);
  });

  it("shows the plan breakdown from the overview", async () => {
    render(<AdminDashboardPage />);

    expect(await screen.findByText(/Pro \(40\)/)).toBeInTheDocument();
  });
});
