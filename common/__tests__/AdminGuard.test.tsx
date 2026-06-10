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
function setFirebaseUser(user: { uid: string } | null) {
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

  it("redirects to / when there is no Firebase user", async () => {
    setFirebaseUser(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith("/"));
    expect(mockApiAdminGetMe).not.toHaveBeenCalled();
    expect(screen.queryByText("secret admin content")).not.toBeInTheDocument();
  });

  it("redirects to / when /admin/me rejects the user (401/403)", async () => {
    setFirebaseUser({ uid: "user-1" });
    mockApiAdminGetMe.mockResolvedValue(null);

    render(
      <AdminGuard>
        <div>secret admin content</div>
      </AdminGuard>,
    );

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith("/"));
    expect(mockApiAdminGetMe).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("secret admin content")).not.toBeInTheDocument();
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
    setFirebaseUser({ uid: "admin-1" });
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
