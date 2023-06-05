import React, { useState, useEffect, ChangeEvent } from 'react';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';
import { Noto_Sans_Thai } from 'next/font/google'
import Link from "next/link";
import styles from './styles.module.css';
import Flag from "react-flagkit";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })


const useWidth = () => {
  const [width, setWidth] = useState(0)
  const handleResize = () => setWidth(window.innerWidth)
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return width
}

/* 
If width >= 922, then a menu dropdown disappear.
*/
export const AppNavbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const width = useWidth()

  return (
    <nav
      className={`${noto_sans_thai.className} navbar navbar-expand-lg navbar-dark bg-dark fixed-top`}
    >
      <div className="container d-flex mt-auto">
        <div className={styles.navbar_header}>
          <h3>Prompt Lab{` ${width}`}</h3>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse border" id="navbarSupportedContent">
          <ul className="border navbar-nav mt-auto mb-auto ms-auto pe-0 me-5 mb-lg-0">
            <li className={`${styles.language_dropdown} nav-item dropdown border`}>
              <a
                className={`nav-link dropdown-toggle`}
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {language === "th" && <Flag country="TH" />}
                {language === "en" && <Flag country="US" />}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a
                    className={`dropdown-item ${styles.language_list}`}
                    onClick={() => {
                      setLanguage("en");
                    }}
                  >
                    <Flag country="US" /> English
                  </a>
                  <a
                    className={`dropdown-item ${styles.language_list}`}
                    onClick={() => {
                      setLanguage("th");
                    }}
                  >
                    <Flag country="TH" /> Thai
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <button className={styles.navbar_help_button}>
                  <Link href={"/help"} className={`${styles.remove_underline}`}>
                    {t("footer.help", language)}
                  </Link>
                </button>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link ">
                <button disabled={true} className={styles.navbar_login_button}>
                  {t("login", language)}
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
