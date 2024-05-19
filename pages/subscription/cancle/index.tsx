import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import CancelSubscriptionSuccess from "@/featureComponents/subscription/SubscriptionAlert/cancle/index";
import { usePromptyContext } from "@/contexts/PromptyContext";

export default function CancelSubscriptionContainer() {
  const router = useRouter();
  const {user} = usePromptyContext();

  const goBackToHome = () => {
    router.push("/");
  };

  return (
    <CancelSubscriptionSuccess
      userEndDate={user?.end_date}
      goBackToHome={goBackToHome}
    />
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
