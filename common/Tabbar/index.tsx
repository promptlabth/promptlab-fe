import React, { useState, useEffect, useRef } from "react";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import { urlLinks } from "@/constants/link.constant";
import { useRouter } from "next/router";
import { useDraggable } from "react-use-draggable-scroll";
import { useTranslation } from "next-i18next";
import styles from "./Tabbar.module.css";
import Link from "next/link";

const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });
export const Tabbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const translate = t;
  const router = useRouter()
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:
  const [titles, setTitles] = useState(urlLinks.map(({ titleKey }) => translate(titleKey)));

  useEffect(() => {
    setTitles(urlLinks.map(({ titleKey }) => t(titleKey)));
  }, [i18n.language]);

  return (
    <div className={`${notoSansThai.className} bg-dark`} >
      <div className={`${styles.container}`}>
        <div className={`${styles.scroll} `} {...events} ref={ref}>
          <div className="">
            {urlLinks.map(({ href }, index) => (
              <Link
                className={styles.urlLinkBtn}
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
  )
}