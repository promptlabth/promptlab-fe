import { TFunction } from "i18next";

export interface CancelSubscriptionModalProps {
    translate: TFunction<"translation", undefined>, 
    handleCancelSubscription: Function
    showModal?: boolean
    handleCloseModal?: () => void
}