import { Button } from "react-bootstrap";
import { formatNumber } from "@/utils/number";

interface AdminPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

// Simple previous/next pagination used by the admin tables.
export const AdminPagination = ({
  page,
  pageSize,
  total,
  onPageChange,
}: AdminPaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="d-flex align-items-center justify-content-between py-2">
      <span className="text-muted small">
        ทั้งหมด {formatNumber(total)} รายการ · หน้า {page} / {totalPages}
      </span>
      <div className="d-flex gap-2">
        <Button
          size="sm"
          variant="outline-secondary"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          ก่อนหน้า
        </Button>
        <Button
          size="sm"
          variant="outline-secondary"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          ถัดไป
        </Button>
      </div>
    </div>
  );
};
