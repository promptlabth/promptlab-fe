import React, { useState, useEffect, ChangeEvent } from 'react';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from '../language';
import { Noto_Sans_Thai } from 'next/font/google'
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { urlLinks } from './constant';
import { useRouter } from 'next/router';
import Link from "next/link";
import styles from './styles.module.css';
import { RiMenu4Fill } from "react-icons/ri"
import Flag from "react-flagkit";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })
import LoginComponent from './LoginButton';

export const AppNavbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const [profileImage, setProfileImage] = useState<string>("")
  const [loginStatus, setLoginStatus] = useState(false);


  const handleLogin = (result: any) => {
    console.log("Login successful, do something with the result:", result);
    setProfileImage(result['user']['photoURL']);
    setLoginStatus(true);
    // You can use the result here or update the state of your parent component
  };

  // function for handle language
  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>, language: string) => {
    // setIsTh(event.target.checked);

    const newLanguage = event.target.checked ? 'th' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <Navbar
      className={`${noto_sans_thai.className}  navbar-dark bg-dark`}
      expand="lg"
      fixed="top"
    >
      <Container className="pt-3 bg-dark">
        <div className={styles.navbar_header}>
          <h3>Prompt Lab</h3>
        </div>
        <Navbar.Toggle
          className={styles.offcanvas_toggler}
          aria-controls="offcanvasNavbar-expand-md"
        >
          <RiMenu4Fill className={styles.offcanvas_menu} />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-mf`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
          className="bg-dark"
        >
          <Offcanvas.Header className="">
            <Offcanvas.Title className="p-0 d-flex justify-content-center">
              <h2 className="text-white">
                <b>Prompt Lab</b>
              </h2>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="ps-5 pe-5">
            <Nav className="justify-content-end flex-grow-1">
              <div className={styles.container}>
                <li className={`${styles.language_dropdown} nav-item dropdown`}>
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
                  <div className="nav-link ">
                    <button className={styles.navbar_help_button}>
                      <Link
                        href={"/createHelp"}
                        className={`${styles.remove_underline}`}
                      >
                        {t("footer.help", language)}
                      </Link>
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link ">
                    <LoginComponent/>
                    {/* <button className={styles.navbar_login_button}>
                      {t("login", language)}
                    </button> */}
                  </div>
                </li>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
