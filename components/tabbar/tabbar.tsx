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
            {urlLinks.map(({ href }, index) => (
                <Link className={styles.btn} href={href} key={index}>
                  {titles[index]}
                </Link>
            ))}
          </li>
        </ul>
      </div>
    </Nav>
  );
};
export default AppTabbar;
