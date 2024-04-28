
import { TFunction } from "i18next";
import { LoginUser } from "@/models/types/loginUser.type";
export interface SubscriptionHeaderProps { 
    translate: TFunction<"translation", undefined> 
    user?: LoginUser | null
}