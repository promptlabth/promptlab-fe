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
import { AiFillVideoCamera } from "react-icons/ai";
import { MdSell, MdOutlineArticle } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaClosedCaptioning } from "react-icons/fa";
import { useUserContext } from "@/contexts/UserContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export const NavbarMobile: React.FC = () => {
  const userContext = useUserContext();
  const { language, setLanguage } = useLanguage();
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      console.log("Resizing...", window.innerWidth);
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const renderLanguageOptions = () => (
    <li>
      <a
        className={`dropdown-item ${styles.language_list}`}
        onClick={() => {
          setLanguage("eng");
        }}
      >
        <Flag country="US" className={`${styles.flag_size} me-2`} /> English
      </a>
      <a
        className={`dropdown-item ${styles.language_list}`}
        onClick={() => {
          setLanguage("th");
        }}
      >
        <Flag country="TH" className={`${styles.flag_size} me-2`} /> Thai
      </a>
      <a
        className={`dropdown-item ${styles.language_list}`}
        onClick={() => {
          setLanguage("id");
        }}
      >
        <Flag country="ID" className={`${styles.flag_size} me-2`} /> Indonesia
      </a>
    </li>
  );

  const renderLanguageDropdown = () => (
    <div
      className={`${styles.language_dropdown}  text-center ms-2 mt-auto mb-auto nav-item dropdown`}
    >
      <a
        className={`nav-link dropdown-toggle`}
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {language === "th" && (
          <Flag country="TH" className={`${styles.flag_size}`} />
        )}
        {language === "eng" && (
          <Flag country="US" className={`${styles.flag_size}`} />
        )}
        {language === "id" && (
          <Flag country="ID" className={`${styles.flag_size}`} />
        )}
      </a>
      <ul
        className={`dropdown-menu dropdown-menu-dark`}
        aria-labelledby="navbarDropdown"
      >
        {renderLanguageOptions()}
      </ul>
    </div>
  );

  const renderLogin = () => (
    <div>
      <div className="nav-item">
        <div className="nav-link d-flex justify-content-center">
          <button
            className={`${styles.facebook_login_button} d-flex justify-content-center align-items-center`}
            onClick={() => {
              userContext?.handleLogin("facebook");
            }}
          >
            <FaFacebook
              className={`me-2 ${styles.social_media_icon}`}
            />
            <div>{translate("login", language)}&nbsp;Facebook</div>
          </button>
        </div>
      </div>
      <div
        className={`d-flex justify-content-center`}
        style={{
          color: windowWidth < 992 ? "white" : "gray",
          marginTop: windowWidth < 992 ? 0 : 15,
          marginBottom: windowWidth < 992 ? 0 : 15,
        }}
      >
        - or -
      </div>
      <div className="nav-link d-flex justify-content-center">
        <button
          className={`${styles.gmail_login_button} d-flex justify-content-center align-items-center`}
          onClick={() => {
            userContext?.handleLogin("gmail");
          }}
        >
          <FcGoogle className={`me-2 ${styles.social_media_icon}`} />
          <div className="">{translate("login", language)}&nbsp;Gmail</div>
        </button>
      </div>
    </div>
  );

  const renderLoginDestopModal = () => (
    <div
      className={`modal fade ${noto_sans_thai.className}`}
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center mb-4">
            <div className="text-end">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <h4>{translate("login", language)}</h4>
            </div>
            {renderLogin()}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginMobile = () => (
    <div className={`${styles.login_container} p-3`}>
      <div className="d-flex justify-content-center">
        <h4 className="text-white">{translate("login", language)}</h4>
      </div>
      {renderLogin()}
    </div>
  );

  const renderNavbarHeader = () => (
    <div className={styles.navbar_header}>
      <h3>Prompt Lab AI</h3>
    </div>
  );

  const renderNavbarToggler = () => (
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
  );

  const renderNavbarHelp = () => (
    <button className={styles.navbar_help_button}>
      <Link href={"/help"} className={`${styles.remove_underline}`}>
        {translate("footer.help", language)}
      </Link>
    </button>
  );

  const renderNavbarLoginButton = () => (
    <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      className={`${styles.navbar_login_button}`}
    >
      {translate("login", language)}
    </button>
  );

  const renderCreateTap = () => (
    <div>
      <CreateNavItem
        icon={<MdSell />}
        href="/createSellingPost"
        title={translate("createSellingPost.title", language)}
      />
      <CreateNavItem
        icon={<HiOutlineLightBulb />}
        href="/createIdeaContent"
        title={translate("createContents.title", language)}
      />
      <CreateNavItem
        icon={<MdOutlineArticle />}
        href="/createArticle"
        title={translate("createArticle.title", language)}
      />
      <CreateNavItem
        icon={<AiFillVideoCamera />}
        href="/createShortVideoScripts"
        title={translate("createScripts.title", language)}
      />
      <CreateNavItem
        icon={<FaClosedCaptioning />}
        href="/createClickBaitWord"
        title={translate("createClickBait.title", language)}
      />
    </div>
  );

  const CreateNavItem = ({
    icon,
    href,
    title,
  }: {
    icon: React.ReactNode;
    href: string;
    title: string;
  }) => (
    <li className="nav-item">
      <div className="nav-link">
        <button className={styles.navbar_help_button}>
          {icon}
          <Link href={href} className={`${styles.remove_underline} ms-2`}>
            {title}
          </Link>
        </button>
      </div>
    </li>
  );

  const renderLargeScreenItems = () => (
    <div className="d-flex align-items-center">
      {renderLanguageDropdown()}
      <li className="nav-item">
        <div className="nav-link">{renderNavbarHelp()}</div>
      </li>
      <li className="nav-item">
        <div className="nav-link d-flex justify-content-center">
          {renderNavbarLoginButton()}
        </div>
      </li>
    </div>
  );

  const renderSmallScreenItems = () => (
    <div>
      {renderLoginMobile()}
      <li className="nav-item">
        <div className="nav-link">
          <button className={styles.navbar_help_button}>
            <AiFillHome />
            <Link href={"/"} className={`${styles.remove_underline} ms-2`}>
              {translate("home.title", language)}
            </Link>
          </button>
        </div>
      </li>
      <li className="nav-item">
        <div className="nav-link">{renderNavbarHelp()}</div>
      </li>
      <li>
        <hr style={{ color: "white" }}></hr>
      </li>
      {renderCreateTap()}
    </div>
  );

  return (
    <>
      {renderLoginDestopModal()}
      <nav
        className={`${noto_sans_thai.className} navbar navbar-expand-lg navbar-dark bg-dark fixed-top`}
      >
        <div className={`container ${styles.navbar_container} d-flex mt-auto`}>
          {renderNavbarHeader()}

          <div className="d-flex align-items-center ms-auto">
            <div className="me-2">
              {windowWidth < 992 && renderLanguageDropdown()}
            </div>

            {renderNavbarToggler()}
          </div>

          <div
            className={`${styles.navcollapse} collapse navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mt-auto mb-auto ms-auto mb-lg-0">
              {windowWidth >= 992 && renderLargeScreenItems()}
              {windowWidth < 992 && renderSmallScreenItems()}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarMobile;
