import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authFirebase } from "@/services/firebase/AuthFirebase";
import signInWithGmail from "@/services/firebase/auth/AuthGmail";
import { apiAdminGetMe } from "@/services/api/AdminAPI";
import { LoadingScreen } from "@/common/LoadingScreen";

interface AdminGuardProps {
  children: ReactNode;
}

type GuardState = "checking" | "no-user" | "denied" | "admin";

// Wraps admin pages: waits for the Firebase auth state, then verifies the
// signed-in user against /admin/me. Instead of silently redirecting, failed
// checks explain WHY (not logged in vs. not an admin) and offer a one-click
// switch to Google sign-in — a lingering Facebook session carries no verified
// email claim, so the server correctly 403s it. Real enforcement stays
// server-side (403 on every /v1/admin route).
export const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const [state, setState] = useState<GuardState>("checking");
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);
  const [providers, setProviders] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
      if (!user) {
        if (isMounted) {
          setState("no-user");
        }
        return;
      }
      setSignedInEmail(
        user.email ?? user.providerData?.[0]?.email ?? null,
      );
      setProviders(
        (user.providerData ?? []).map((p) => p?.providerId ?? "unknown"),
      );
      // apiAdminGetMe returns null on 401/403/network errors.
      const me = await apiAdminGetMe();
      if (!isMounted) {
        return;
      }
      setState(me?.is_admin ? "admin" : "denied");
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sign the current (wrong-provider) session out, then open the Google
  // popup; onAuthStateChanged re-fires with the new user and re-runs the
  // admin check automatically.
  const switchToGoogle = async () => {
    setState("checking");
    try {
      await signOut(authFirebase);
    } catch {
      // ignore — proceeding to sign-in regardless
    }
    await signInWithGmail();
  };

  if (state === "checking") {
    return <LoadingScreen />;
  }

  if (state === "no-user" || state === "denied") {
    return (
      <div className="container text-center py-5" style={{ maxWidth: 520 }}>
        <h4 className="mb-3">เข้าหน้าแอดมินไม่ได้</h4>
        {state === "no-user" ? (
          <p>
            ยังไม่ได้เข้าสู่ระบบ — กดปุ่มด้านล่างเพื่อเข้าสู่ระบบด้วยบัญชี{" "}
            <strong>Google</strong> ของแอดมิน
          </p>
        ) : (
          <>
            <p>
              บัญชีที่เข้าสู่ระบบ
              {signedInEmail ? (
                <>
                  {" "}
                  (<strong>{signedInEmail}</strong>)
                </>
              ) : (
                <>
                  {" "}
                  (<strong>ไม่มีอีเมลในบัญชีนี้</strong>)
                </>
              )}{" "}
              ไม่มีสิทธิ์ผู้ดูแลระบบ
            </p>
            {providers.length > 0 ? (
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                เข้าสู่ระบบผ่าน: <strong>{providers.join(", ")}</strong>
                {providers.some((p) => p.includes("facebook")) ? (
                  <>
                    {" "}
                    — การเข้าสู่ระบบด้วย Facebook
                    จะไม่ได้สิทธิ์แอดมิน
                  </>
                ) : null}
              </p>
            ) : null}
          </>
        )}
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={switchToGoogle}
          >
            เข้าสู่ระบบด้วย Google
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => router.replace("/")}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
