import React, { useState, useEffect } from "react";
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "../language";
import { Noto_Sans_Thai } from "next/font/google";
import { Nav } from "react-bootstrap";
import { urlLinks } from "../navbar/constant";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Link from "next/link";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });

export const AppTabbar: React.FC = () => {
  const { language } = useLanguage();
  const [titles, setTitles] = useState(
    urlLinks.map(({ titleKey }) => t(titleKey, language))
  );
  // const router = useRouter();
  // const [pathname, setPathname] = useState<string>("createSellingPost");
  // const [profileImage, setProfileImage] = useState<string>("");
  // const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    // if (router.pathname === "/") {
    //   setPathname("/createSellingPost");
    // } else {
    //   setPathname(router.pathname);
    // }
    setTitles(urlLinks.map(({ titleKey }) => t(titleKey, language)));
  }, [language]);

  return (
    <Nav className={`${noto_sans_thai.className} justify-content-center bg-dark`}>
      <div className={styles.container}>
        <ul>
          <li>
            <button type="button" className={styles.btn}>
              หน้าหลัก
            </button>
            {urlLinks.map(({ href }, index) => (
                <Link key={index} href={href} className={styles.btn}>
                  {titles[index]}
                </Link>
            ))}

            {/* 
              <button type="button" className={styles.btn}>
                เขียนแคปชั่นขายของ
              </button>
              <button type="button" className={styles.btn}>
                ช่วยคิดคอนเทนต์
              </button>
              <button type="button" className={styles.btn}>
                เขียนบทความ
              </button>
              <button type="button" className={styles.btn}>
                เขียนสคริปวิดีโอสั้น
              </button>
              <button type="button" className={styles.btn}>
                เขียนประโยคเปิดคลิป
              </button> */}
          </li>
        </ul>
      </div>
    </Nav>
  );
};
export default AppTabbar;
