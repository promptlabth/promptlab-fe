import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authFirebase } from "@/services/firebase/AuthFirebase";
import signInWithGmail from "@/services/firebase/auth/AuthGmail";
import { apiAdminGetMe } from "@/services/api/AdminAPI";
import { AdminMeResponse } from "@/models/types/admin.type";
import { LoadingScreen } from "@/common/LoadingScreen";

interface AdminGuardProps {
  children: ReactNode;
}

type GuardState = "checking" | "no-user" | "denied" | "admin";

// Maps the server's machine reason to a Thai explanation. The server is
// authoritative about WHY admin was denied (it sees the decoded token and the
// allowlist); the client only knows the Firebase session.
function explainReason(me: AdminMeResponse | null): string {
  switch (me?.reason) {
    case "no_allowlist_configured":
      return "เซิร์ฟเวอร์ยังไม่ได้ตั้งค่ารายชื่อผู้ดูแลระบบ (ADMIN_EMAILS) — โปรดติดต่อผู้ดูแลระบบ/ฝ่ายเทคนิค";
    case "email_not_trusted":
      return "อีเมลของบัญชีนี้ยังไม่ได้รับการยืนยัน — กรุณาเข้าสู่ระบบด้วย Google (การเข้าสู่ระบบด้วย Facebook จะไม่ได้สิทธิ์แอดมิน)";
    case "no_email_claim":
      return "บัญชีนี้ไม่มีอีเมล — กรุณาเข้าสู่ระบบด้วย Google ด้วยอีเมลที่เป็นแอดมิน";
    case "email_not_in_allowlist":
      return "อีเมลนี้ไม่อยู่ในรายชื่อผู้ดูแลระบบ";
    default:
      return "ไม่มีสิทธิ์เข้าถึงหน้าผู้ดูแลระบบ";
  }
}

// Wraps admin pages: waits for the Firebase auth state, then verifies the
// signed-in user against /admin/me. Failed checks explain WHY (using the
// server's reason code) and offer a one-click switch to Google sign-in.
// Real enforcement stays server-side (403 on every data-bearing /v1/admin route).
export const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const [state, setState] = useState<GuardState>("checking");
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);
  const [me, setMe] = useState<AdminMeResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
      if (!user) {
        if (isMounted) {
          setState("no-user");
        }
        return;
      }
      setSignedInEmail(user.email ?? user.providerData?.[0]?.email ?? null);
      // apiAdminGetMe returns the whoami object on 200 (even for non-admins,
      // carrying is_admin:false + reason), or null on 401/expired/network.
      const result = await apiAdminGetMe();
      if (!isMounted) {
        return;
      }
      setMe(result);
      setState(result?.is_admin ? "admin" : "denied");
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sign the current session out, then open the Google popup;
  // onAuthStateChanged re-fires and re-runs the admin check automatically.
  const switchToGoogle = async () => {
    setState("checking");
    try {
      await signOut(authFirebase);
    } catch {
      // ignore — proceed to sign-in regardless
    }
    await signInWithGmail();
  };

  if (state === "checking") {
    return <LoadingScreen />;
  }

  if (state === "no-user" || state === "denied") {
    const email = me?.email || signedInEmail;
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
            <p>{explainReason(me)}</p>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              บัญชีที่เข้าสู่ระบบ:{" "}
              <strong>{email || "ไม่มีอีเมลในบัญชีนี้"}</strong>
              {me?.sign_in_provider ? (
                <>
                  {" "}
                  · ผ่าน <strong>{me.sign_in_provider}</strong>
                </>
              ) : null}
            </p>
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
