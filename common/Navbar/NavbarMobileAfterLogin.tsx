import React, { useState, useEffect } from "react";
import { Noto_Sans_Thai } from "next/font/google";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { RiMenu4Fill } from "react-icons/ri";
import Flag from "react-flagkit";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import { AiFillHome } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { AiFillVideoCamera } from "react-icons/ai";
import { MdSell, MdOutlineArticle } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaClosedCaptioning } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { BsFillCircleFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useUserContext } from "@/contexts/UserContext";
import { MdWorkspacePremium } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const NavbarMobileAfterLogin: React.FC = () => {
  const userContext = useUserContext();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  // const rank: string = "Free"
  const [windowWidth, setWindowWidth] = useState(0);

  const changeLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  // Add key to rankColor
  const rankColor: { [key: string]: string } = {
    Gold: "linear-gradient(180deg, #FFB800 0%, #564A2B 26.66%, #33393F 54.26%)",
    Silver: "linear-gradient(180deg, #A8A8A8 0%, #33393F 42.8%)",
    Bronze:
      "linear-gradient(180deg, #33393F 0%, #CD7F32 0.01%, #563C23 18.75%, #33393F 44.79%)",
    Free: "#33393F",
  };

  const rankColorForMobile: { [key: string]: string } = {
    Gold: "linear-gradient(180deg, #FFB800 0%, rgba(33, 37, 41, 0.85) 100%)",
    Silver: "linear-gradient(180deg,  #A8A8A8 0%, rgba(33, 37, 41, 0.85) 100%)",
    Bronze:
      "linear-gradient(180deg, rgba(205, 127, 50, 0.85) 0%, rgba(33, 37, 41, 0.85) 100%)",
    Free: "#33393F",
  };

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

  const renderLanguageOptions = () => (
    <li>
      <a
        className={`dropdown-item ${styles.language_list}`}
        onClick={() => {
          changeLocale("en");
        }}
      >
        <Flag country="US" className={`${styles.flag_size} me-2`} /> English
      </a>
      <a
        className={`dropdown-item ${styles.language_list}`}
        onClick={() => {
          changeLocale("th");
        }}
      >
        <Flag country="TH" className={`${styles.flag_size} me-2`} /> Thai
      </a>
      <a
        className={`dropdown-item ${styles.language_list}`}
        onClick={() => {
          changeLocale("id")
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
        {i18n.language === "th" && (
          <Flag country="TH" className={`${styles.flag_size}`} />
        )}
        {i18n.language === "en" && (
          <Flag country="US" className={`${styles.flag_size}`} />
        )}
        {i18n.language === "id" && (
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
      <BiHelpCircle className={`${styles.navbar_help_icon}`} />
      <Link href={"/help"} className={`${styles.remove_underline}`}>
        {t("footer.help")}
      </Link>
    </button>
  );

  const renderProfileButton = () => (
    <div className="pt-4 pb-3">
      {userContext?.user === null ? (
        <Spinner
          className="text-white m-4"
          animation="border"
          style={{ width: "3rem", height: "3rem" }}
        />
      ) : (
        <>
          <img
            className={`${styles.user_profile_pic}`}
            src={userContext?.user?.profilepic!}
            alt="profic-pic"
            style={{
              border:
                userContext?.user?.planType! === "Gold"
                  ? "3.25px solid #FFB800"
                  : userContext?.user?.planType! === "Silver"
                    ? "3.25px solid #A8A8A8"
                    : userContext?.user?.planType! === "Bronze"
                      ? "3.25px solid #CD7F32"
                      : "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
            }}
          />
          <div className="pt-2 pb-2">
            <b className="fs-4 fw-bold text-white">
              {" "}
              {userContext?.user?.name}{" "}
            </b>
          </div>
          <li className="d-flex justify-content-center">
            <Link
              href="/profile"
              className={`${styles.subscription_manage_btn}`}
            >
              {" "}
              {t("profile.title")}{" "}
            </Link>
          </li>
        </>
      )}
    </div>
  );
  const profileDesktopScreen = () => (
    <li className={`nav-item dropdown ${noto_sans_thai.className}`}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          className={`${styles.user_profile_pic_desktop}`}
          src={userContext?.user?.profilepic}
          alt="profic-pic"
          style={{
            border:
              userContext?.user?.planType! === "Gold"
                ? "3.25px solid #FFB800"
                : userContext?.user?.planType! === "Silver"
                  ? "3.25px solid #A8A8A8"
                  : userContext?.user?.planType! === "Bronze"
                    ? "3.25px solid #CD7F32"
                    : "none",
            borderRadius: "50%",
            width: "42px",
            height: "42px",
          }}
        />
      </a>
      <ul
        className={`${styles.login_dropdown_menu} border dropdown-menu px-1`}
        style={{
          marginLeft: "-8rem",
          background:
            userContext?.user?.plan_id !== 4
              ? rankColor[userContext?.user?.planType!]
              : "#33393F",
        }}
      >
        <li>
          <div className="text-white text-center fs-5 fw-semibold text">
            {userContext?.user?.name}
          </div>
        </li>

        {userContext?.user?.plan_id !== 4 && (
          <>
            <li className="d-flex justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
              >
                {userContext?.user?.planType! === "Gold" && (
                  <circle cx="14" cy="14" r="14" fill="#FFB800" />
                )}
                {userContext?.user?.planType! === "Silver" && (
                  <circle cx="14" cy="14" r="14" fill="#A3A3A3" />
                )}
                {userContext?.user?.planType! === "Bronze" && (
                  <circle cx="14" cy="14" r="14" fill="#CD7F32" />
                )}
              </svg>
              <div className="ps-2 fw-bold text-white">
                {" "}
                {userContext?.user?.planType!}{" "}
              </div>
            </li>
          </>
        )}
        <li className="pt-2 d-flex justify-content-center">
          <Link href="/profile" className={`${styles.subscription_manage_btn}`}>
            {" "}
            {t("profile.title")}{" "}
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider bg-white" />
        </li>
        <li className="text-center py-1">
          <a className={`${styles.login_dropdown_history_menu} `}>
            <Link
              href={"/"}
              className={`${styles.remove_underline} d-flex align-items-center`}
            >
              <AiFillHome className="m-1 ms-2" size={22} />
              <div className="ps-2 pt-1">
                {t("home.title")}
              </div>
            </Link>
          </a>
        </li>
        <li className=" py-1 ">{history()}</li>
        <li className="py-1 ">{logoutDesktopScreen()}</li>
      </ul>
    </li>
  );

  const planDestopScrren = () => (
    <li className="nav-item">
      <div className="nav-link">
        <button className={styles.navbar_help_button}>
          <Link
            href={"/subscription"}
            className={`${styles.remove_underline} d-flex`}
            style={{ fontSize: 18 }}
          >
            {t("subscription")}
            <div style={{ marginTop: "-0.5rem" }}>
              <MdNewReleases color="orange" />
            </div>
          </Link>
        </button>
      </div>
    </li>
  );

  const planTypeScreen = () => (
    <li className="nav-item">
      <div className="nav-link">
        <button className={`${styles.navbar_help_button}`}>
          <MdWorkspacePremium />
          <Link
            href={"/subscription"}
            className={`${styles.remove_underline} ms-2`}
          >
            {t("subscription")}
          </Link>
        </button>
      </div>
    </li>
  );

  const renderCreateTap = () => (
    <div>
      <CreateNavItem
        icon={<MdSell />}
        href="/createSellingPost"
        title={t("createSellingPost.title")}
      />
      <CreateNavItem
        icon={<HiOutlineLightBulb />}
        href="/createIdeaContent"
        title={t("createContents.title")}
      />
      <CreateNavItem
        icon={<MdOutlineArticle />}
        href="/createArticle"
        title={t("createArticle.title")}
      />
      <CreateNavItem
        icon={<AiFillVideoCamera />}
        href="/createShortVideoScripts"
        title={t("createScripts.title")}
      />
      <CreateNavItem
        icon={<FaClosedCaptioning />}
        href="/createClickBaitWord"
        title={t("createClickBait.title")}
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

  const coinScreen = () => (
    <div className="nav-link d-flex align-items-center">
      <BsFillCircleFill size={20} className={`${styles.coin}`} />
      <div className="px-2 user-select-none">-</div>

      <div className="user-select-none opacity-50 ">
        <AiFillPlusCircle className={`${styles.add_coin}`} size={34} />
      </div>
    </div>
  );

  const logoutDesktopScreen = () => (
    <Link
      href="/"
      className={`${styles.login_dropdown_history_menu} d-flex align-items-center`}
      onClick={() => {
        userContext?.handleLogout();
      }}
    >
      <BiLogOut className="m-1 ms-2" size={20} />
      <div className="ps-2 pt-1"> {t("logout")}</div>
    </Link>
  );

  const logoutMobileScreen = () => (
    <button
      className={`${styles.navbar_logout_button}`}
      onClick={() => {
        userContext?.handleLogout();
      }}
    >
      {t("logout")}
    </button>
  );

  const history = () => (
    <a className={`${styles.login_dropdown_history_menu} `}>
      <Link
        href={"/history"}
        className={`${styles.remove_underline} d-flex align-items-center`}
      >
        <AiOutlineHistory className="m-1 ms-2" size={22} />
        <div className="ps-2 pt-1"> {t("history")}</div>
      </Link>
    </a>
  );
  const historyMobile = () => (
    <button className={styles.navbar_help_button}>
      <AiOutlineHistory />
      <Link href={"/history"} className={`${styles.remove_underline} ms-2`}>
        {t("history")}
      </Link>
    </button>
  );
  const renderLargeScreenItems = () => (
    <div className="d-flex align-items-center">
      <li className="nav-item">{coinScreen()}</li>
      {renderLanguageDropdown()}
      {userContext?.user?.plan_id === 4 && planDestopScrren()}
      <li className="nav-item">
        <div className="nav-link">{renderNavbarHelp()}</div>
      </li>
      {userContext?.user === null ? (
        <Spinner
          className="text-white ms-2"
          animation="border"
          style={{ width: "2.5rem", height: "2.5rem" }}
        />
      ) : (
        profileDesktopScreen()
      )}
    </div>
  );

  const renderSmallScreenItems = () => (
    <div>
      <li
        className={`${styles.profile} nav-item text-center`}
        style={{
          // backgroundColor: "#33393F",
          backgroundColor: !userContext?.user?.planType
            ? "#33393F"
            : rankColorForMobile[userContext?.user?.planType!],
        }}
      >
        {renderProfileButton()}
      </li>
      <li>
        <hr style={{ color: "white" }}></hr>{" "}
      </li>
      <li className="nav-item">
        <div className="nav-link">
          <button className={styles.navbar_help_button}>
            <AiFillHome />
            <Link href={"/"} className={`${styles.remove_underline} ms-2`}>
              {t("home.title")}
            </Link>
          </button>
        </div>
      </li>
      {userContext?.user?.planType === "Free" && planTypeScreen()}
      <li className="nav-item">
        <div className="nav-link">{renderNavbarHelp()}</div>
      </li>
      <li className="nav-item">
        <div className="nav-link">
          {historyMobile()}
        </div>
      </li>
      <li>
        <hr style={{ color: "white" }}></hr>
      </li>
      {renderCreateTap()}
      <li className="nav-item text-center mt-2 mb-2">{logoutMobileScreen()}</li>
    </div>
  );

  return (
    <>
      <nav
        className={`${noto_sans_thai.className} navbar navbar-expand-lg navbar-dark bg-dark`}
        style={{position: "fixed", top: 0, width: "100%", zIndex: 2}}
      >
        <div className={`container d-flex mt-auto`}>
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

export default NavbarMobileAfterLogin;
