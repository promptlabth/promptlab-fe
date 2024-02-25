import React, { useState, useEffect, useRef } from "react";
import { Noto_Sans_Thai } from "next/font/google";
import { urlLinks } from "../../constant";
import { useRouter } from "next/router";
import { useDraggable } from "react-use-draggable-scroll";
import { useTranslation } from "next-i18next";
import styles from "./styles.module.css";
import Link from "next/link";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
export const AppTabbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter()
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  const [titles, setTitles] = useState(urlLinks.map(({ titleKey }) => t(titleKey)));


  useEffect(() => {
    setTitles(urlLinks.map(({ titleKey }) => t(titleKey)));
  }, [i18n.language]);


  return (
    <div className={`${noto_sans_thai.className} bg-dark`} >
      <div className={`${styles.container}`}>
        <div className={`${styles.scroll} `} {...events} ref={ref}>
          <div className="">
            {urlLinks.map(({ href }, index) => (
              <Link
                className={styles.btn}
                href={href}
                key={index}
                style={{
                  background: href === router.pathname ? "none" : "rgb(0, 255, 171,0.8)",
                  color: href === router.pathname ? "white" : ""
                }}
              >
                {titles[index]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppTabbar;
