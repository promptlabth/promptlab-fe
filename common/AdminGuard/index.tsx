import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase } from "@/services/firebase/AuthFirebase";
import { apiAdminGetMe } from "@/services/api/AdminAPI";
import { LoadingScreen } from "@/common/LoadingScreen";

interface AdminGuardProps {
  children: ReactNode;
}

type GuardState = "checking" | "no-user" | "denied" | "admin";

// Wraps admin pages: waits for the Firebase auth state, then verifies the
// signed-in user against /admin/me. Instead of silently redirecting, failed
// checks explain WHY (not logged in vs. not an admin) so access problems are
// diagnosable; real enforcement is server-side (403 on every /v1/admin route).
export const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const [state, setState] = useState<GuardState>("checking");
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
      if (!user) {
        if (isMounted) {
          setState("no-user");
        }
        return;
      }
      setSignedInEmail(user.email ?? null);
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

  if (state === "checking") {
    return <LoadingScreen />;
  }

  if (state === "no-user" || state === "denied") {
    return (
      <div className="container text-center py-5" style={{ maxWidth: 480 }}>
        <h4 className="mb-3">เข้าหน้าแอดมินไม่ได้</h4>
        {state === "no-user" ? (
          <p>
            ยังไม่ได้เข้าสู่ระบบ — กรุณาเข้าสู่ระบบด้วยบัญชี{" "}
            <strong>Google</strong> ของแอดมินจากหน้าหลักก่อน
            แล้วกลับมาที่หน้านี้อีกครั้ง
          </p>
        ) : (
          <p>
            บัญชีที่เข้าสู่ระบบ
            {signedInEmail ? (
              <>
                {" "}
                (<strong>{signedInEmail}</strong>)
              </>
            ) : null}{" "}
            ไม่มีสิทธิ์ผู้ดูแลระบบ — ต้องเข้าสู่ระบบผ่าน{" "}
            <strong>Google</strong> ด้วยอีเมลที่ถูกตั้งเป็นแอดมิน
            (การเข้าสู่ระบบด้วย Facebook จะไม่ได้สิทธิ์แอดมิน)
          </p>
        )}
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={() => router.replace("/")}
        >
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
