import { TFunction } from "i18next"
import { LoginUser } from "@/models/types/loginUser.type"
export interface ProfilShowProps {
  translate: TFunction<"translation", undefined>
  user?: LoginUser | null
  handleShowModal?: () => void
}
