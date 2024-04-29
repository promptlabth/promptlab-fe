import { useEffect } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { apiUserPremiumSubscribe } from "@/services/api/PaymentAPI";
import { UserPremiumSubscribeRequest } from "@/models/types/dto/requests/PaymentRequest.type";
import { SubscriptionSuccessPresentation } from "@/featureComponents/subscription/SubscriptionAlert/success/index";

export default function SubscriptionSuccessContainer({
  session_id,
  planType,
}: any) {
  const userContext = useUserContext();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    handleSuccessPayment(session_id);
  }, [session_id]);

  const handleSuccessPayment = async (session_id: string | null) => {
    if (session_id !== null) {
      const data: UserPremiumSubscribeRequest = {
        CheckoutSessionId: session_id,
      };

      await apiUserPremiumSubscribe(data);
      await userContext?.updateGeneratedMessageCount();
    } else {
      console.error("Invalid session_id");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <SubscriptionSuccessPresentation
      planType={planType}
      t={t}
      handleBack={handleBack}
      userContext={userContext}
    />
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
