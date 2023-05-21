import React, { useState, useEffect, useRef} from "react";
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "../language";
import { Noto_Sans_Thai } from "next/font/google";
import { Nav } from "react-bootstrap";
import { urlLinks } from "../navbar/constant";
import { useRouter } from "next/router";
import { useDraggable } from "react-use-draggable-scroll";

import styles from "./styles.module.css";
import Link from "next/link";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
export const AppTabbar: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter()
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:
  
  const [titles, setTitles] = useState( urlLinks.map(({ titleKey }) => t(titleKey, language)) );


  useEffect(() => {
    setTitles(urlLinks.map(({ titleKey }) => t(titleKey, language)));
  }, [language]);


  return (
    <Nav className={`${noto_sans_thai.className} justify-content-center bg-dark`}>
      <div className={styles.container}>
        <div className={styles.scroll} {...events} ref={ref}>
          <li>
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
          </li>
        </div>
      </div>
    </Nav>
  );
};
export default AppTabbar;
