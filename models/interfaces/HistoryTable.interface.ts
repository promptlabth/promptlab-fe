import { TFunction } from "i18next";
import { PromptMessage } from "../types/prompt.type";
export interface HistoryTableProps {
  translate: TFunction<"translation", undefined>;
  promptMessages: PromptMessage[];
}
