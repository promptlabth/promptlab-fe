import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase } from "@/services/firebase/AuthFirebase";
import { apiAdminGetMe } from "@/services/api/AdminAPI";
import { LoadingScreen } from "@/common/LoadingScreen";

interface AdminGuardProps {
  children: ReactNode;
}

// Wraps admin pages: waits for the Firebase auth state, then verifies the
// signed-in user against /admin/me. Anyone who is not a confirmed admin
// (no user, 401, 403 or network failure) is redirected to the home page.
export const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(authFirebase, async (user) => {
      if (!user) {
        router.replace("/");
        return;
      }
      // apiAdminGetMe returns null on 401/403/network errors.
      const me = await apiAdminGetMe();
      if (!isMounted) {
        return;
      }
      if (me?.is_admin) {
        setIsAdmin(true);
      } else {
        router.replace("/");
      }
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAdmin) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
