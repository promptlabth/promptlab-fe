import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

const mockReplace = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

const mockOnAuthStateChanged = jest.fn();
const mockSignOut = jest.fn();
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: (...args: unknown[]) => mockOnAuthStateChanged(...args),
  signOut: (...args: unknown[]) => mockSignOut(...args),
}));

jest.mock("@/services/firebase/AuthFirebase", () => ({
  authFirebase: {},
}));

const mockSignInWithGmail = jest.fn();
jest.mock("@/services/firebase/auth/AuthGmail", () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockSignInWithGmail(...args),
}));

const mockApiAdminGetMe = jest.fn();
jest.mock("@/services/api/AdminAPI", () => ({
  apiAdminGetMe: (...args: unknown[]) => mockApiAdminGetMe(...args),
}));

import { AdminGuard } from "@/common/AdminGuard";

type FakeUser = {
  uid: string;
  email?: string | null;
  providerData?: Array<{ providerId: string; email?: string | null }>;
} | null;

// Drives the mocked Firebase auth state: the guard subscribes via
// onAuthStateChanged and we immediately fire the callback with `user`.
function setFirebaseUser(user: FakeUser) {
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
    mockSignOut.mockReset();
    mockSignInWithGmail.mockReset();
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

  it("explains the account lacks admin rights and shows the email when present", async () => {
    setFirebaseUser({
      uid: "user-1",
      email: "user@example.test",
      providerData: [{ providerId: "google.com" }],
    });
    mockApiAdminGetMe.mockResolvedValue(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    expect(
      await screen.findByText(/ไม่มีสิทธิ์ผู้ดูแลระบบ/),
    ).toBeInTheDocument();
    // The signed-in email and provider are surfaced for diagnosis.
    expect(screen.getByText("user@example.test")).toBeInTheDocument();
    expect(screen.getByText("google.com")).toBeInTheDocument();
    expect(mockApiAdminGetMe).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("secret admin content")).not.toBeInTheDocument();
  });

  it("flags an email-less Facebook session — the cause of server 403s", async () => {
    setFirebaseUser({
      uid: "user-2",
      email: null,
      providerData: [{ providerId: "facebook.com", email: null }],
    });
    mockApiAdminGetMe.mockResolvedValue(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    expect(
      await screen.findByText("ไม่มีอีเมลในบัญชีนี้"),
    ).toBeInTheDocument();
    expect(screen.getByText("facebook.com")).toBeInTheDocument();
    expect(
      screen.getByText(/การเข้าสู่ระบบด้วย Facebook/),
    ).toBeInTheDocument();
  });

  it("signs out and opens the Google popup when switching accounts", async () => {
    setFirebaseUser({
      uid: "user-2",
      email: null,
      providerData: [{ providerId: "facebook.com" }],
    });
    mockApiAdminGetMe.mockResolvedValue(null);
    mockSignOut.mockResolvedValue(undefined);
    mockSignInWithGmail.mockResolvedValue(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    const button = await screen.findByRole("button", {
      name: "เข้าสู่ระบบด้วย Google",
    });
    button.click();

    await waitFor(() => expect(mockSignOut).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockSignInWithGmail).toHaveBeenCalledTimes(1));
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
    setFirebaseUser({
      uid: "admin-1",
      email: "admin@example.test",
      providerData: [{ providerId: "google.com" }],
    });
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
