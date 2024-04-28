import { Plan } from "@/models/types/plan.type";
import { LoginUser } from "@/models/types/loginUser.type";
export type LoginResponse = {
    plan: Plan;
    user: LoginUser;
}