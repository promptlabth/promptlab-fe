import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Badge,
  Button,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminGuard } from "@/common/AdminGuard";
import { AdminShell } from "@/featureComponents/admin/AdminShell";
import { AdminPagination } from "@/featureComponents/admin/AdminPagination";
import {
  apiAdminGetUserDetail,
  apiAdminGetUsers,
  apiAdminPatchUser,
} from "@/services/api/AdminAPI";
import {
  AdminUserDetailResponse,
  AdminUserItem,
} from "@/models/types/admin.type";
import { formatNumber } from "@/utils/number";
import { formatBangkokDateTime } from "@/utils/date";

const PAGE_SIZE = 20;

interface PlanOption {
  id: number;
  planType: string;
}

const UserDetailModal = ({
  userId,
  planOptions,
  onClose,
  onChanged,
}: {
  userId: number;
  planOptions: PlanOption[];
  onClose: () => void;
  onChanged: () => void;
}) => {
  const [detail, setDetail] = useState<AdminUserDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  const loadDetail = useCallback(async () => {
    setIsLoading(true);
    const data = await apiAdminGetUserDetail(userId);
    setDetail(data);
    if (data?.user.plan_id != null) {
      setSelectedPlanId(String(data.user.plan_id));
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const handleChangePlan = async () => {
    if (!selectedPlanId) return;
    setIsSaving(true);
    const result = await apiAdminPatchUser(userId, {
      plan_id: Number(selectedPlanId),
    });
    setIsSaving(false);
    if (result) {
      toast.success("เปลี่ยนแผนสำเร็จ");
      await loadDetail();
      onChanged();
    } else {
      toast.error("เปลี่ยนแผนไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const handleResetBalance = async () => {
    if (!window.confirm("ยืนยันรีเซ็ตโควตาการใช้งานของผู้ใช้นี้เป็น 0?")) {
      return;
    }
    setIsSaving(true);
    const result = await apiAdminPatchUser(userId, { reset_balance: true });
    setIsSaving(false);
    if (result) {
      toast.success("รีเซ็ตโควตาสำเร็จ");
      await loadDetail();
      onChanged();
    } else {
      toast.error("รีเซ็ตโควตาไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const user = detail?.user;
  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          ผู้ใช้ #{userId} {user?.name ?? ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && (
          <div className="text-center py-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">กำลังโหลด...</span>
            </Spinner>
          </div>
        )}
        {!isLoading && !detail && (
          <div className="text-muted py-3">โหลดข้อมูลผู้ใช้ไม่สำเร็จ</div>
        )}
        {!isLoading && detail && user && (
          <>
            <Row className="small mb-3">
              <Col md={6}>
                <div>
                  <b>อีเมล:</b> {user.email ?? "-"}
                </div>
                <div>
                  <b>แพลตฟอร์ม:</b> {user.platform ?? "-"}
                </div>
                <div>
                  <b>Stripe:</b> {user.stripe_id ?? "-"}
                </div>
                <div>
                  <b>สมัครเมื่อ:</b> {formatBangkokDateTime(user.created_at)}
                </div>
                <div>
                  <b>ใช้งานล่าสุด:</b>{" "}
                  {formatBangkokDateTime(user.last_active_at)}
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <b>แผน:</b> {user.plan_type ?? "-"}{" "}
                  {user.plan_id != null && (
                    <span className="text-muted">(#{user.plan_id})</span>
                  )}
                </div>
                <div>
                  <b>โควตาที่ใช้:</b> {formatNumber(user.balance_message ?? 0)}{" "}
                  / {formatNumber(user.max_messages ?? 0)}
                </div>
                <div>
                  <b>เริ่มสมาชิก:</b>{" "}
                  {formatBangkokDateTime(detail.subscription.sub_date)}
                </div>
                <div>
                  <b>หมดอายุ:</b>{" "}
                  {formatBangkokDateTime(detail.subscription.end_sub_date)}
                </div>
                <div>
                  <b>รายเดือน:</b>{" "}
                  {detail.subscription.monthly == null
                    ? "-"
                    : detail.subscription.monthly
                      ? "ใช่"
                      : "ไม่ใช่"}
                </div>
              </Col>
            </Row>
            <div className="border rounded p-3 mb-3 bg-light">
              <div className="fw-bold small mb-2">จัดการผู้ใช้</div>
              <Row className="g-2 align-items-center">
                <Col xs="auto">
                  <Form.Select
                    size="sm"
                    aria-label="เลือกแผน"
                    value={selectedPlanId}
                    onChange={(event) => setSelectedPlanId(event.target.value)}
                  >
                    <option value="">เลือกแผน...</option>
                    {planOptions.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.planType} (#{plan.id})
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs="auto">
                  <Button
                    size="sm"
                    variant="primary"
                    disabled={isSaving || !selectedPlanId}
                    onClick={handleChangePlan}
                  >
                    เปลี่ยนแผน
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    size="sm"
                    variant="outline-danger"
                    disabled={isSaving}
                    onClick={handleResetBalance}
                  >
                    รีเซ็ตโควตา
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="fw-bold small mb-2">
              ข้อความล่าสุด ({detail.recent_generations.length})
            </div>
            <Table size="sm" bordered hover responsive className="small">
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>ฟีเจอร์</th>
                  <th>โทน</th>
                  <th>ข้อความ</th>
                </tr>
              </thead>
              <tbody>
                {detail.recent_generations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-muted text-center">
                      ไม่มีข้อมูล
                    </td>
                  </tr>
                )}
                {detail.recent_generations.map((generation) => (
                  <tr key={generation.id}>
                    <td className="text-nowrap">
                      {formatBangkokDateTime(generation.date_time)}
                    </td>
                    <td>{generation.feature_id ?? "-"}</td>
                    <td>{generation.tone_name ?? "-"}</td>
                    <td>{generation.input_excerpt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onClose}>
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const AdminUsersPage = () => {
  const [items, setItems] = useState<AdminUserItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [planFilter, setPlanFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  // Plan options are accumulated from the plans seen in the listing
  // (there is no dedicated /admin/plans endpoint in the contract).
  const plansRef = useRef<Map<number, string>>(new Map());
  const [planOptions, setPlanOptions] = useState<PlanOption[]>([]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    const planId = planFilter ? Number(planFilter) : undefined;
    const data = await apiAdminGetUsers(
      page,
      PAGE_SIZE,
      search || undefined,
      planId,
    );
    if (data) {
      setItems(data.items);
      setTotal(data.total);
      let plansChanged = false;
      data.items.forEach((item) => {
        if (item.plan_id != null && !plansRef.current.has(item.plan_id)) {
          plansRef.current.set(item.plan_id, item.plan_type ?? `#${item.plan_id}`);
          plansChanged = true;
        }
      });
      if (plansChanged) {
        setPlanOptions(
          Array.from(plansRef.current.entries())
            .map(([id, planType]) => ({ id, planType }))
            .sort((a, b) => a.id - b.id),
        );
      }
    } else {
      setItems([]);
      setTotal(0);
      toast.error("โหลดรายชื่อผู้ใช้ไม่สำเร็จ");
    }
    setIsLoading(false);
  }, [page, search, planFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <AdminGuard>
      <AdminShell active="users" title="ผู้ใช้">
        <ToastContainer position="top-right" autoClose={3000} />
        <Form onSubmit={handleSearchSubmit} className="mb-3">
          <Row className="g-2 align-items-center">
            <Col xs={12} md={4}>
              <Form.Control
                size="sm"
                type="search"
                placeholder="ค้นหาชื่อหรืออีเมล..."
                aria-label="ค้นหาผู้ใช้"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" size="sm" variant="primary">
                ค้นหา
              </Button>
            </Col>
            <Col xs="auto">
              <Form.Select
                size="sm"
                aria-label="กรองตามแผน"
                value={planFilter}
                onChange={(event) => {
                  setPage(1);
                  setPlanFilter(event.target.value);
                }}
              >
                <option value="">ทุกแผน</option>
                {planOptions.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.planType} (#{plan.id})
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form>
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
                  <th>โควตาที่ใช้</th>
                  <th>ใช้งานล่าสุด</th>
                  <th>สมัครเมื่อ</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-muted text-center py-3">
                      ไม่พบผู้ใช้
                    </td>
                  </tr>
                )}
                {items.map((user) => (
                  <tr
                    key={user.id}
                    role="button"
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <td>{user.id}</td>
                    <td>{user.name ?? "-"}</td>
                    <td>{user.email ?? "-"}</td>
                    <td>
                      {user.plan_type ?? "-"}{" "}
                      {user.stripe_id && (
                        <Badge bg="info" pill>
                          stripe
                        </Badge>
                      )}
                    </td>
                    <td>
                      {formatNumber(user.balance_message ?? 0)} ÷{" "}
                      {formatNumber(user.max_messages ?? 0)}
                    </td>
                    <td className="text-nowrap">
                      {formatBangkokDateTime(user.last_active_at)}
                    </td>
                    <td className="text-nowrap">
                      {formatBangkokDateTime(user.created_at)}
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
        {selectedUserId != null && (
          <UserDetailModal
            userId={selectedUserId}
            planOptions={planOptions}
            onClose={() => setSelectedUserId(null)}
            onChanged={fetchUsers}
          />
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

export default AdminUsersPage;
