import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

const mockReplace = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

const mockOnAuthStateChanged = jest.fn();
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: (...args: unknown[]) => mockOnAuthStateChanged(...args),
}));

jest.mock("@/services/firebase/AuthFirebase", () => ({
  authFirebase: {},
}));

const mockApiAdminGetMe = jest.fn();
jest.mock("@/services/api/AdminAPI", () => ({
  apiAdminGetMe: (...args: unknown[]) => mockApiAdminGetMe(...args),
}));

import { AdminGuard } from "@/common/AdminGuard";

// Drives the mocked Firebase auth state: the guard subscribes via
// onAuthStateChanged and we immediately fire the callback with `user`.
function setFirebaseUser(user: { uid: string; email?: string } | null) {
  mockOnAuthStateChanged.mockImplementation(
    (_auth: unknown, callback: (user: unknown) => void) => {
      callback(user);
      return jest.fn(); // unsubscribe
    },
  );
}

describe("AdminGuard", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockOnAuthStateChanged.mockReset();
    mockApiAdminGetMe.mockReset();
  });

  it("explains that login is required when there is no Firebase user", async () => {
    setFirebaseUser(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    expect(
      await screen.findByText(/ยังไม่ได้เข้าสู่ระบบ/),
    ).toBeInTheDocument();
    expect(mockApiAdminGetMe).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.queryByText("secret admin content")).not.toBeInTheDocument();
  });

  it("explains the account lacks admin rights when /admin/me rejects (401/403)", async () => {
    setFirebaseUser({ uid: "user-1", email: "user@example.test" });
    mockApiAdminGetMe.mockResolvedValue(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    expect(
      await screen.findByText(/ไม่มีสิทธิ์ผู้ดูแลระบบ/),
    ).toBeInTheDocument();
    // The signed-in email is surfaced for diagnosis.
    expect(screen.getByText("user@example.test")).toBeInTheDocument();
    expect(mockApiAdminGetMe).toHaveBeenCalledTimes(1);
    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.queryByText("secret admin content")).not.toBeInTheDocument();
  });

  it("navigates home when the back-to-home button is clicked", async () => {
    setFirebaseUser(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    const button = await screen.findByRole("button", {
      name: "กลับหน้าหลัก",
    });
    button.click();
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith("/"));
  });

  it("shows a loading state while the admin check is pending", () => {
    setFirebaseUser({ uid: "user-1" });
    mockApiAdminGetMe.mockReturnValue(new Promise(() => {}));

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("secret admin content")).not.toBeInTheDocument();
  });

  it("renders children when the user is a confirmed admin", async () => {
    setFirebaseUser({ uid: "admin-1", email: "admin@example.test" });
    mockApiAdminGetMe.mockResolvedValue({
      is_admin: true,
      email: "admin@example.test",
    });

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    expect(
      await screen.findByText("secret admin content"),
    ).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
