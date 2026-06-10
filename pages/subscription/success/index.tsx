import { useEffect } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SubscriptionSuccessPresentation } from "@/featureComponents/subscription/SubscriptionAlert/success/index";
import { usePromptyContext } from "@/contexts/PromptyContext";
export default function SubscriptionSuccessContainer({ planType }: any) {
  const { user, updateGeneratedMessageCount } = usePromptyContext();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // Plan activation is webhook-driven (Stripe -> payment service); the client only refreshes its usage count.
    updateGeneratedMessageCount();
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <SubscriptionSuccessPresentation
      planType={planType}
      t={t}
      handleBack={handleBack}
      user={user}
      />
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
