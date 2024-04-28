import { useUserContext } from "@/contexts/UserContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import CancelSubscriptionSuccess from "@/featureComponents/subscription/SubscriptionAlert/cancle/index";

export default function CancelSubscriptionContainer() {
  const router = useRouter();
  const userContext = useUserContext();

  const goBackToHome = () => {
    router.push("/");
  };

  return (
    <CancelSubscriptionSuccess
      userEndDate={userContext?.user?.end_date}
      goBackToHome={goBackToHome}
    />
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
