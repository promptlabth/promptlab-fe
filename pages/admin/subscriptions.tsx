import { useCallback, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Nav, Spinner, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminGuard } from "@/common/AdminGuard";
import { AdminShell } from "@/featureComponents/admin/AdminShell";
import { AdminPagination } from "@/featureComponents/admin/AdminPagination";
import { apiAdminGetSubscriptions } from "@/services/api/AdminAPI";
import {
  AdminSubscriptionItem,
  AdminSubscriptionStatus,
} from "@/models/types/admin.type";
import { formatBangkokDateTime } from "@/utils/date";

const PAGE_SIZE = 20;

const STATUS_TABS: { key: AdminSubscriptionStatus; label: string }[] = [
  { key: "all", label: "ทั้งหมด" },
  { key: "active", label: "ใช้งานอยู่" },
  { key: "expiring", label: "ใกล้หมดอายุ" },
];

// True when end_sub_date falls within the next 7 days (highlighted red).
const isExpiringSoon = (endSubDate: string | null): boolean => {
  if (!endSubDate) return false;
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(endSubDate);
  const end = new Date(hasTimezone ? endSubDate : `${endSubDate}Z`);
  if (isNaN(end.getTime())) return false;
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return end.getTime() >= now && end.getTime() <= now + sevenDays;
};

const AdminSubscriptionsPage = () => {
  const [status, setStatus] = useState<AdminSubscriptionStatus>("all");
  const [items, setItems] = useState<AdminSubscriptionItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSubscriptions = useCallback(async () => {
    setIsLoading(true);
    const data = await apiAdminGetSubscriptions(status, page);
    if (data) {
      setItems(data.items);
      setTotal(data.total);
    } else {
      setItems([]);
      setTotal(0);
      toast.error("โหลดข้อมูลสมาชิกไม่สำเร็จ");
    }
    setIsLoading(false);
  }, [status, page]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return (
    <AdminGuard>
      <AdminShell active="subscriptions" title="สมาชิก">
        <ToastContainer position="top-right" autoClose={3000} />
        <Nav
          variant="tabs"
          activeKey={status}
          className="mb-3"
          onSelect={(key) => {
            setPage(1);
            setStatus((key as AdminSubscriptionStatus) ?? "all");
          }}
        >
          {STATUS_TABS.map((tab) => (
            <Nav.Item key={tab.key}>
              <Nav.Link eventKey={tab.key}>{tab.label}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">กำลังโหลด...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table bordered hover responsive size="sm" className="small bg-white">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>ชื่อ</th>
                  <th>อีเมล</th>
                  <th>แผน</th>
                  <th>Stripe</th>
                  <th>เริ่มสมาชิก</th>
                  <th>หมดอายุ</th>
                  <th>รายเดือน</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-muted text-center py-3">
                      ไม่พบสมาชิก
                    </td>
                  </tr>
                )}
                {items.map((subscription) => (
                  <tr key={subscription.id}>
                    <td>{subscription.id}</td>
                    <td>{subscription.name ?? "-"}</td>
                    <td>{subscription.email ?? "-"}</td>
                    <td>
                      {subscription.plan_type ?? "-"}{" "}
                      {subscription.plan_id != null && (
                        <span className="text-muted">
                          (#{subscription.plan_id})
                        </span>
                      )}
                    </td>
                    <td>{subscription.stripe_id ?? "-"}</td>
                    <td className="text-nowrap">
                      {formatBangkokDateTime(subscription.sub_date)}
                    </td>
                    <td
                      className={`text-nowrap ${
                        isExpiringSoon(subscription.end_sub_date)
                          ? "text-danger fw-bold"
                          : ""
                      }`}
                    >
                      {formatBangkokDateTime(subscription.end_sub_date)}
                    </td>
                    <td>
                      {subscription.monthly == null
                        ? "-"
                        : subscription.monthly
                          ? "ใช่"
                          : "ไม่ใช่"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <AdminPagination
              page={page}
              pageSize={PAGE_SIZE}
              total={total}
              onPageChange={setPage}
            />
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

export default AdminSubscriptionsPage;
