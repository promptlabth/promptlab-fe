// Client-only chart components built on recharts.
// These are imported with next/dynamic ({ ssr: false }) from the admin
// dashboard so recharts never runs during SSR.
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AdminDailyAnalyticsPoint,
  AdminFeatureAnalyticsItem,
  AdminMonthlyAnalyticsPoint,
} from "@/models/types/admin.type";

interface DailyChartProps {
  days: AdminDailyAnalyticsPoint[];
}

export const DailyLineChart = ({ days }: DailyChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={days} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="generations"
          name="ข้อความที่สร้าง"
          stroke="#0d6efd"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="active_users"
          name="ผู้ใช้งาน"
          stroke="#198754"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

interface MonthlyChartProps {
  months: AdminMonthlyAnalyticsPoint[];
}

export const MonthlyBarChart = ({ months }: MonthlyChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={months}
        margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="generations" name="ข้อความที่สร้าง" fill="#0d6efd" />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface FeatureChartProps {
  features: AdminFeatureAnalyticsItem[];
}

export const FeatureBarChart = ({ features }: FeatureChartProps) => {
  const data = features.map((feature) => ({
    ...feature,
    label: feature.feature_name ?? `ฟีเจอร์ #${feature.feature_id}`,
  }));
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, data.length * 40)}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 8, right: 16, bottom: 0, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="label"
          width={160}
          tick={{ fontSize: 11 }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="generations" name="ข้อความที่สร้าง" fill="#6f42c1" />
        <Bar dataKey="unique_users" name="ผู้ใช้ไม่ซ้ำ" fill="#fd7e14" />
      </BarChart>
    </ResponsiveContainer>
  );
};
