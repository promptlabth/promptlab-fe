import React, { useState, useEffect } from "react";
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "../language";
import { Noto_Sans_Thai } from "next/font/google";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { urlLinks } from "../navbar/constant";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { RiMenu4Fill } from "react-icons/ri";
import Flag from "react-flagkit";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });

export const AppTabbar: React.FC = () => {
  const { language } = useLanguage();
  const [titles, setTitles] = useState(
    urlLinks.map(({ titleKey }) => t(titleKey, language))
  );
  const router = useRouter();
  const [pathname, setPathname] = useState<string>("createSellingPost");
  const [profileImage, setProfileImage] = useState<string>("");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (router.pathname === "/") {
      setPathname("/createSellingPost");
    } else {
      setPathname(router.pathname);
    }
    setTitles(urlLinks.map(({ titleKey }) => t(titleKey, language)));
  }, [language]);

  const handleLogin = (result: any) => {
    console.log("Login successful, do something with the result:", result);
    setProfileImage(result["user"]["photoURL"]);
    setLoginStatus(true);
    // You can use the result here or update the state of your parent component
  };

    return (
      <Nav
        className={`${noto_sans_thai.className} justify-content-center bg-dark`}
      >
        <div className={styles.container}>
          <ul>
            <li>
              <button type="button" className={styles.btn}>
                หน้าหลัก
              </button>
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
              </button>
            </li>
          </ul>
        </div>
      </Nav>
    );
};
export default AppTabbar;
