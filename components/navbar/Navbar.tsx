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
import { VscTriangleLeft } from "react-icons/vsc";

export const AppNavbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [profileImage, setProfileImage] = useState<string>("")
  const [loginStatus, setLoginStatus] = useState(false);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [menuShow, setMenuShow] = useState<boolean>(false);
  const [navActive, setNavActive] = useState(null);

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

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  })

  const AppNavbarMobile: React.FC = () => {
    // const { language, setLanguage } = useLanguage();

    // const [profileImage, setProfileImage] = useState<string>("");
    // const [loginStatus, setLoginStatus] = useState(false);

    // const handleLogin = (result: any) => {
    //   console.log("Login successful, do something with the result:", result);
    //   setProfileImage(result["user"]["photoURL"]);
    //   setLoginStatus(true);
    //   // You can use the result here or update the state of your parent component
    // };

    // function for handle language
    // const handleLanguageChange = (
    //   event: ChangeEvent<HTMLInputElement>,
    //   language: string
    // ) => {
    //   // setIsTh(event.target.checked);

    //   const newLanguage = event.target.checked ? "th" : "en";
    //   setLanguage(newLanguage);
    // };

    return (
      <Container className="pt-3 bg-dark">
        <a className={``} onClick={() => { setMenuShow(false) }}>
          <VscTriangleLeft color="white"></VscTriangleLeft>
        </a>
        <Offcanvas.Header className="d-flex justify-content-center">
          <Offcanvas.Title className={`p-0 d-flex justify-content-center`}>
            <h2 className="text-white">
              <b>Prompt Lab</b>
            </h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="ps-5 pe-5 d-flex justify-content-center">
          <ul className="justify-content-center">
            <li className={`${styles.language_dropdown} nav-item dropdown mt-3`}>
              <a className={`${styles.navbar_language}`}>
                {language === "th" && <Flag country="TH" />} TH
                {language === "en" && <Flag country="US" />}
              </a>
            </li>
            <li className="nav-item mt-3">
              <div className="nav-link ">
                {/* <LoginComponent/> */}
                <button disabled={true} className={styles.navbar_login_button}>
                  {t("login", language)}
                </button>
              </div>
            </li>
            <li className="nav-item mt-3">
              <div className="nav-link ">
                <button className={styles.navbar_help_button}>
                  <Link href={"/help"} className={`${styles.remove_underline}`}>
                    {t("footer.help", language)}
                  </Link>
                </button>
              </div>
            </li>
          </ul>
        </Offcanvas.Body>
      </Container>
    );
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
          onClick={() => setMenuShow(true)}
        >
          <RiMenu4Fill className={styles.offcanvas_menu} />
        </Navbar.Toggle>

        {windowSize[0] >= 992 &&
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
                          href={"/help"}
                          className={`${styles.remove_underline}`}
                        >
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
                </div>
              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>

        }

        {windowSize[0] < 992 &&
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-mf`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            // className="bg-dark"
            className={'bg-dark'+ (menuShow ? ' flex' : ' hidden')}

          >

            {menuShow && <AppNavbarMobile />}
          </Navbar.Offcanvas>
        }
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
