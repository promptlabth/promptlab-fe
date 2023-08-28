import React, { useState, useEffect} from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/languages/language";
import { Noto_Sans_Thai } from "next/font/google";
import Link from "next/link";
import styles from "./styles.module.css";
import { RiMenu4Fill } from "react-icons/ri";
import Flag from "react-flagkit";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import { AiFillHome } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import {  AiFillVideoCamera } from "react-icons/ai";
import { MdSell, MdOutlineArticle } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaClosedCaptioning } from "react-icons/fa";
import { useUserContext } from "@/contexts/UserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export const NavbarMobile: React.FC = () => {
  const userContext = useUserContext()
  const { language, setLanguage } = useLanguage();


  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // เรียกใช้งานฟังก์ชัน handleResize เพื่อกำหนดค่าเริ่มต้น

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        className={`modal fade ${noto_sans_thai.className} `}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-dialog-centered`}>
          <div className={`modal-content`}>
            <div className={`modal-body text-center mb-4`}>
              <div className={`text-end`}>
                <button
                  type="button"
                  className={`btn-close`}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <h4 className="mb-4">เข้าสู่ระบบ</h4>
              <Row className="row">
                <Col className="d-flex flex-column align-items-center">
                  <button className={`btn btn-block mb-3 ${styles.btn}`}>
                    <BsFacebook
                      className="me-3 align-items-start"
                      fontSize={20}
                    ></BsFacebook>
                    Sign in with facebook
                  </button>
                  <p style={{ color: "#c2c2c2" }}>- or -</p>
                  <button className={`btn btn-block ${styles.btn_google}`}>
                    <FcGoogle className="me-3" fontSize={20}></FcGoogle>
                    Sign in with google
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`${noto_sans_thai.className} navbar navbar-expand-lg navbar-dark bg-dark fixed-top`}
      >
        <div className={`container d-flex mt-auto`}>
          <div className={styles.navbar_header}>
            <h3>Prompt Lab</h3>
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
            <RiMenu4Fill className={styles.offcanvas_menu} />
          </button>
          <div
            className={`${styles.navcollapse} collapse navbar-collapse`}
            id="navbarSupportedContent"
          >
            {windowWidth < 1000 ? (
              <ul className="navbar-nav mt-auto mb-auto ms-auto mb-lg-0">
                <li
                  className={`${styles.profileUnlog} nav-item text-center pb-3`}
                >
                  <div className="pt-4">
                    <p>
                      <b>{translate("unlog", language)}</b>
                    </p>
                    <div className="nav-link ">
                      <button
                        className={styles.navbar_login_button}
                        onClick={() => {
                          userContext?.handleLogin();
                        }}
                      >
                        {translate("login", language)}
                      </button>
                    </div>
                  </div>
                </li>
                <li
                  className={`${styles.language_dropdown} text-center ms-2 mt-2 mb-auto nav-item dropdown`}
                >
                  <a
                    className={`nav-link dropdown-toggle`}
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {language === "th" && <Flag country="TH" />}
                    {language === "eng" && <Flag country="US" />}
                    {language === "id" && <Flag country="ID" />}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className={`dropdown-item ${styles.language_list}`}
                        onClick={() => {
                          setLanguage("eng");
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
                      <a
                        className={`dropdown-item ${styles.language_list}`}
                        onClick={() => {
                          setLanguage("id");
                        }}
                      >
                        <Flag country="ID" /> Indonesia
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <button className={styles.navbar_help_button}>
                      <AiFillHome />
                      <Link
                        href={"/"}
                        className={`${styles.remove_underline} ms-2`}
                      >
                        {translate("home.title", language)}
                      </Link>
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <button className={styles.navbar_help_button}>
                      <BiHelpCircle />
                      <Link
                        href={"/help"}
                        className={`${styles.remove_underline} ms-2`}
                      >
                        {translate("footer.help", language)}
                      </Link>
                    </button>
                  </div>
                </li>
                <li>
                  <hr style={{ color: "white" }}></hr>
                </li>
                <div>
                  <li className="nav-item">
                    <div className="nav-link">
                      <button className={styles.navbar_help_button}>
                        <MdSell />
                        <Link
                          href={"/createSellingPost"}
                          className={`${styles.remove_underline} ms-2`}
                        >
                          {translate("createSellingPost.title", language)}
                        </Link>
                      </button>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <button className={styles.navbar_help_button}>
                        <HiOutlineLightBulb />
                        <Link
                          href={"/createIdeaContent"}
                          className={`${styles.remove_underline} ms-2`}
                        >
                          {translate("createContents.title", language)}
                        </Link>
                      </button>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <button className={styles.navbar_help_button}>
                        <MdOutlineArticle />
                        <Link
                          href={"/createArticle"}
                          className={`${styles.remove_underline} ms-2`}
                        >
                          {translate("createArticle.title", language)}
                        </Link>
                      </button>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <button className={styles.navbar_help_button}>
                        <AiFillVideoCamera />
                        <Link
                          href={"/createShortVideoScripts"}
                          className={`${styles.remove_underline} ms-2`}
                        >
                          {translate("createScripts.title", language)}
                        </Link>
                      </button>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <button className={styles.navbar_help_button}>
                        <FaClosedCaptioning />
                        <Link
                          href={"/createClickBaitWord"}
                          className={`${styles.remove_underline} ms-2`}
                        >
                          {translate("createClickBait.title", language)}
                        </Link>
                      </button>
                    </div>
                  </li>
                </div>
              </ul>
            ) : (
              <ul className="navbar-nav mt-auto mb-auto ms-auto mb-lg-0">
                <li
                  className={`${styles.language_dropdown} text-center ms-2 mt-auto mb-auto nav-item dropdown`}
                >
                  <a
                    className={`nav-link dropdown-toggle`}
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {language === "th" && <Flag country="TH" />}
                    {language === "eng" && <Flag country="US" />}
                    {language === "id" && <Flag country="ID" />}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className={`dropdown-item ${styles.language_list}`}
                        onClick={() => {
                          setLanguage("eng");
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
                      <a
                        className={`dropdown-item ${styles.language_list}`}
                        onClick={() => {
                          setLanguage("id");
                        }}
                      >
                        <Flag country="ID" /> Indonesia
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <button className={styles.navbar_help_button}>
                      <Link href={"/"} className={`${styles.remove_underline}`}>
                        {translate("home.title", language)}
                      </Link>
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <button className={styles.navbar_help_button}>
                      <Link
                        href={"/help"}
                        className={`${styles.remove_underline}`}
                      >
                        {translate("footer.help", language)}
                      </Link>
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link ">
                    <button
                      // disabled
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className={styles.navbar_login_button}
                      // onClick={() => {
                      //   userContext?.handleLogin();
                      // }}
                    >
                      {translate("login", language)}
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
