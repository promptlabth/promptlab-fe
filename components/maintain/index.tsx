import { translate } from "@/languages/language";
import styles from "./styles.module.css";
import { useLanguage } from "@/contexts/LanguageContext";
import { IoMdConstruct } from "react-icons/io"
import { useTranslation } from "next-i18next";
export const MaintainPage = () => {
   const { language } = useLanguage();
   const { t } = useTranslation();

   return (
      <>
         <div className={`${styles.shadow_bg} d-flex align-items-center justify-content-center`}>
            <IoMdConstruct size={100} className="pe-2" />
            <h1 className={styles.maintain_text}> {t("maintain")} </h1>
         </div>
      </>
   )
}