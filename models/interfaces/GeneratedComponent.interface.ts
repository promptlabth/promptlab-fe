import { TFunction } from "i18next";
import { LoginUser } from "../types/loginUser.type";
export interface GeneratedComponentProps {
  titlePage: string;
  titleDescription: string;
  prompt: (input: string, type: string) => string;
}