import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { AdminGuard } from "@/common/AdminGuard";
import { AdminShell } from "@/featureComponents/admin/AdminShell";
import {
  apiAdminGetAnalyticsDaily,
  apiAdminGetAnalyticsFeatures,
  apiAdminGetAnalyticsMonthly,
  apiAdminGetOverview,
} from "@/services/api/AdminAPI";
import {
  AdminDailyAnalyticsResponse,
  AdminFeaturesAnalyticsResponse,
  AdminMonthlyAnalyticsResponse,
  AdminOverviewResponse,
} from "@/models/types/admin.type";
import { formatNumber } from "@/utils/number";

// recharts must never run during SSR: load the chart components client-side only.
const DailyLineChart = dynamic(
  () =>
    import("@/featureComponents/admin/AdminCharts").then(
      (mod) => mod.DailyLineChart,
    ),
  { ssr: false },
);
const MonthlyBarChart = dynamic(
  () =>
    import("@/featureComponents/admin/AdminCharts").then(
      (mod) => mod.MonthlyBarChart,
    ),
  { ssr: false },
);
const FeatureBarChart = dynamic(
  () =>
    import("@/featureComponents/admin/AdminCharts").then(
      (mod) => mod.FeatureBarChart,
    ),
  { ssr: false },
);

interface StatCardProps {
  label: string;
  value: number | undefined;
  sub?: string;
}

const StatCard = ({ label, value, sub }: StatCardProps) => (
  <Col xs={6} md={4} lg={3} className="mb-3">
    <Card className="h-100 shadow-sm">
      <Card.Body className="py-3">
        <div className="text-muted small">{label}</div>
        <div className="fs-3 fw-bold" data-testid={`stat-${label}`}>
          {formatNumber(value).toString()}
        </div>
        {sub && <div className="text-muted small">{sub}</div>}
      </Card.Body>
    </Card>
  </Col>
);

const AdminDashboardPage = () => {
  const [overview, setOverview] = useState<AdminOverviewResponse | null>(null);
  const [daily, setDaily] = useState<AdminDailyAnalyticsResponse | null>(null);
  const [monthly, setMonthly] = useState<AdminMonthlyAnalyticsResponse | null>(
    null,
  );
  const [features, setFeatures] =
    useState<AdminFeaturesAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const [overviewData, dailyData, monthlyData, featuresData] =
        await Promise.all([
          apiAdminGetOverview(),
          apiAdminGetAnalyticsDaily(30),
          apiAdminGetAnalyticsMonthly(12),
          apiAdminGetAnalyticsFeatures(),
        ]);
      setOverview(overviewData);
      setDaily(dailyData);
      setMonthly(monthlyData);
      setFeatures(featuresData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <AdminGuard>
      <AdminShell active="dashboard" title="แดชบอร์ด">
        {isLoading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">กำลังโหลด...</span>
            </Spinner>
          </div>
        )}
        {!isLoading && (
          <>
            <Row>
              <StatCard
                label="ผู้ใช้ทั้งหมด"
                value={overview?.users.total}
                sub={`ใหม่วันนี้ ${formatNumber(
                  overview?.users.new_today,
                )} · เดือนนี้ ${formatNumber(overview?.users.new_this_month)}`}
              />
              <StatCard
                label="สมาชิกแบบเสียเงิน"
                value={overview?.subscriptions.active_paid}
              />
              <StatCard
                label="ข้อความที่สร้างวันนี้"
                value={overview?.generations.today}
              />
              <StatCard
                label="ข้อความที่สร้างเดือนนี้"
                value={overview?.generations.this_month}
                sub={`ทั้งหมด ${formatNumber(overview?.generations.total)}`}
              />
              <StatCard
                label="ผู้ใช้งานวันนี้"
                value={overview?.active_users.today}
              />
              <StatCard
                label="ผู้ใช้งานเดือนนี้"
                value={overview?.active_users.this_month}
              />
              <StatCard
                label="หมดอายุใน 7 วัน"
                value={overview?.subscriptions.expiring_in_7_days}
              />
            </Row>
            {overview && overview.subscriptions.by_plan.length > 0 && (
              <div className="mb-3 text-muted small">
                แยกตามแผน:{" "}
                {overview.subscriptions.by_plan
                  .map(
                    (plan) =>
                      `${plan.plan_type} (${formatNumber(plan.count)})`,
                  )
                  .join(" · ")}
              </div>
            )}
            <Row>
              <Col lg={12} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="fs-6">
                      ย้อนหลัง 30 วัน: ข้อความที่สร้าง / ผู้ใช้งาน
                    </Card.Title>
                    {daily ? (
                      <DailyLineChart days={daily.days} />
                    ) : (
                      <div className="text-muted py-4">ไม่มีข้อมูล</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} className="mb-3">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="fs-6">
                      ย้อนหลัง 12 เดือน: ข้อความที่สร้าง
                    </Card.Title>
                    {monthly ? (
                      <MonthlyBarChart months={monthly.months} />
                    ) : (
                      <div className="text-muted py-4">ไม่มีข้อมูล</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} className="mb-3">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="fs-6">
                      การใช้งานแยกตามฟีเจอร์ (ทั้งหมด)
                    </Card.Title>
                    {features && features.features.length > 0 ? (
                      <FeatureBarChart features={features.features} />
                    ) : (
                      <div className="text-muted py-4">ไม่มีข้อมูล</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </AdminShell>
    </AdminGuard>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default AdminDashboardPage;
