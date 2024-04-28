import Layout from "@/common/Layout";
import { PromptMessage } from "@/models/types/prompt.type";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HistoryHeader } from "@/featureComponents/history/HistoryHeader";
import { HistoryTable } from "@/featureComponents/history/HistoryTable";


const History = () => {
  const [prompts, setPrompts] = useState<PromptMessage[]>([
    {
      id: 1,
      date_time: new Date("2024-04-28T08:00:00Z"),
      input_message: "Hey there! How's your day going?",
      result_message: "My day is going well, thanks for asking!",
      user_id: 1,
      tone_id: 1,
      tone: "สนุกสนสน",
      feature_id: 1,
    },
    {
      id: 2,
      date_time: new Date("2024-04-28T10:30:00Z"),
      input_message: "I need help with something urgent.",
      result_message: "Sure, what do you need help with?",
      user_id: 1,
      tone_id: 1,
      tone: "สนุกสนสน",
      feature_id: 1,
    },
    {
      id: 3,
      date_time: new Date("2024-04-28T12:15:00Z"),
      input_message: "Can you provide more details on the project?",
      result_message: "Of course, here are the details...",
      user_id: 1,
      tone_id: 1,
      tone: "สนุกสนสน",
      feature_id: 1,
    },
    {
      id: 4,
      date_time: new Date("2024-04-28T14:45:00Z"),
      input_message: "This is getting frustrating.",
      result_message: "I understand, let's see how we can resolve this.",
      user_id: 1,
      tone_id: 1,
      tone: "สนุกสนสน",
      feature_id: 1,
    },
    {
      id: 5,
      date_time: new Date("2024-04-28T16:00:00Z"),
      input_message: "Thank you for your assistance!",
      result_message: "You're welcome!",
      user_id: 1,
      tone_id: 1,
      tone: "สนุกสนสน",
      feature_id: 1,
    },
  ]);
  const { t } = useTranslation();
  const translate = t;

  const fetchData = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout pageTitle="history" pageContent="A generated messages history">
      <HistoryHeader translate={translate} />
      <HistoryTable translate={translate} promptMessages={prompts} />
    </Layout>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default History;