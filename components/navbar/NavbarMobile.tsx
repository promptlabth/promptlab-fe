import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/languages/language";
import { Noto_Sans_Thai } from "next/font/google";
import Link from "next/link";
import styles from "./styles.module.css";
import { RiMenu4Fill } from "react-icons/ri";
import Flag from "react-flagkit";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import { AiFillHome, AiFillFacebook } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { AiFillVideoCamera } from "react-icons/ai";
import { MdSell, MdOutlineArticle } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaClosedCaptioning } from "react-icons/fa";
import { useUserContext } from "@/contexts/UserContext";
import { FcGoogle } from "react-icons/fc"
import { BsFillCircleFill } from "react-icons/bs"
import { RxAvatar } from "react-icons/rx"

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
      <>
         <nav className={`${noto_sans_thai.className}  navbar navbar-expand-lg navbar-dark bg-dark fixed-top`}>
            <div className={`border container ${styles.navbar_container} d-flex mt-auto`}>
               <div className={styles.navbar_header}>
                  <h3>Prompt Lab</h3>
               </div>
               <ul className="navbar-nav mt-auto mb-auto ms-auto mb-lg-0">

               </ul>
               {windowWidth < 992 &&
                  (
                     <li className={`d-flex ${styles.language_dropdown} text-center ps-2 me-4 mt-auto mb-auto nav-item dropdown text-white pe-2`}>
                        <a
                           className={`nav-link dropdown-toggle`}
                           id="navbarDropdown"
                           data-bs-toggle="dropdown"
                           aria-expanded="false"
                        >
                           {language === "th" && <Flag className={`${styles.flag_size} pe-2`} country="TH" />}
                           {language === "eng" && <Flag className={`${styles.flag_size} pe-2`} country="US" />}
                           {language === "id" && <Flag className={`${styles.flag_size} pe-2`} country="ID" />}
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-dark`} aria-labelledby="navbarDropdown">
                           <li>
                              <a
                                 className={`dropdown-item ${styles.language_list} `}
                                 onClick={() => {
                                    setLanguage("eng");
                                 }}
                              >
                                 <Flag country="US" className={`${styles.flag_size} pe-2`} /> English
                              </a>
                              <a
                                 className={`dropdown-item ${styles.language_list} `}
                                 onClick={() => {
                                    setLanguage("th");
                                 }}
                              >
                                 <Flag country="TH" className={`${styles.flag_size} pe-2`} /> Thai
                              </a>
                              <a
                                 className={`dropdown-item ${styles.language_list}`}
                                 onClick={() => {
                                    setLanguage("id");
                                 }}
                              >
                                 <Flag country="ID" className={`${styles.flag_size} pe-2`} /> Indonesia
                              </a>
                           </li>
                        </ul>
                     </li>
                  )
               }

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
               <div className={`${styles.navcollapse} collapse navbar-collapse`} id="navbarSupportedContent">

                  <ul className="navbar-nav mt-auto mb-auto ms-auto mb-lg-0">
                     {windowWidth >= 992 &&
                        (
                           <div className="d-flex  align-items-center">
                              <li className="nav-item">
                                 <div className="nav-link">
                                    <BsFillCircleFill size={20} className={`${styles.coin}`} />
                                    99999 +
                                 </div>
                              </li>

                              <li className={`${styles.language_dropdown}  text-center ms-2 mt-auto mb-auto nav-item dropdown`}>
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
                                       <Link
                                          href={"/help"}
                                          className={`${styles.remove_underline}`}
                                       >
                                          {translate("footer.help", language)}
                                       </Link>
                                    </button>
                                 </div>
                              </li>
                              <div className="nav-link d-flex justify-content-center">
                                 <button
                                    className={styles.navbar_login_button}
                                    // TODO Wait for onClick to show Modal
                                    // onClick={() => {
                                    //    userContext?.handleLogin("facebook");
                                    // }}
                                 >
                                    {translate("login", language)}
                                 </button>
                              </div>

                           </div>
                        )
                     }
                     {windowWidth < 992 &&
                        (
                           <div>
                              <div className={`${styles.login_container}`}>
                                 <div className=" d-flex  justify-content-center">
                                    <h4 className="text-white">{translate("login", language)}</h4>
                                 </div>

                                 <li className="nav-item">
                                    <div className="nav-link d-flex justify-content-center">
                                       <button
                                          className={styles.facebook_login_button}
                                          onClick={() => {
                                             userContext?.handleLogin("facebook");
                                          }}
                                       >
                                          <AiFillFacebook className="me-1" />
                                          {translate("login", language)}
                                          &nbsp;Facebook
                                       </button>
                                    </div>
                                    <div className="nav-link  d-flex  justify-content-center">

                                       <button
                                          className={styles.gmail_login_button}
                                          onClick={() => {
                                             userContext?.handleLogin("gmail");
                                          }}
                                       >
                                          <FcGoogle className="me-1" />
                                          {translate("login", language)}
                                          &nbsp;Gmail
                                       </button>
                                    </div>
                                 </li>
                              </div>
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
                           </div>
                        )}
                  </ul>
               </div>
            </div>

         </nav>
         {/* 
     
          <div
            className={`${styles.navcollapse} collapse navbar-collapse`}
            id="navbarSupportedContent"
          >
            {windowWidth < 1000 ? (
              <>
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
                            userContext?.handleLogin("facebook");
                          }}
                        >
                          {translate("login", language)}
                          &nbsp;Facebook
                        </button>
                        <button
                          className={styles.navbar_login_button}
                          onClick={() => {
                            userContext?.handleLogin("gmail");
                          }}
                        >
                          {translate("login", language)}
                          &nbsp;Gmail
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
                  
                  </div>
                </ul>
              </>

            ) : (
              <ul className="navbar-nav mt-auto mb-auto ms-auto mb-lg-0">
                
                <li className="nav-item">
                  <div className="nav-link">
                    <button className={styles.navbar_help_button}>
                      <Link
                        href={"/"}
                        className={`${styles.remove_underline}`}
                      >
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
                      className={styles.navbar_login_button}
                      onClick={() => {
                        userContext?.handleLogin("facebook");
                      }}
                    >
                      {translate("login", language)}
                      &nbsp;Facebook
                    </button>
                    <button
                      className={styles.navbar_login_button}
                      onClick={() => {
                        userContext?.handleLogin("gmail");
                      }}
                    >
                      {translate("login", language)}
                      &nbsp;Gmail
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav> */}
      </>

   );
};

export default NavbarMobile;
