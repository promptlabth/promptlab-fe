import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "./SunsetModal.module.css";

const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });

// The service closes at the end of this date (local time).
export const SUNSET_DATE = "2026-12-30";

// Key in localStorage that records when the viewer last dismissed the notice.
export const SUNSET_DISMISSED_KEY = "sunsetNoticeDismissedAt";

// After dismissing, the notice stays hidden for this long, then shows again.
const REMIND_AFTER_MS = 24 * 60 * 60 * 1000;

// Days left until the closing date, never negative.
export function daysUntilSunset(now: dayjs.Dayjs = dayjs()): number {
  const end = dayjs(SUNSET_DATE).endOf("day");
  return Math.max(0, end.diff(now.startOf("day"), "day"));
}

// Whether the notice was dismissed recently enough to stay hidden.
// Reads localStorage defensively: it can be missing or throw (private mode).
function wasRecentlyDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(SUNSET_DISMISSED_KEY);
    if (!raw) {
      return false;
    }
    const dismissedAt = Number(raw);
    return Number.isFinite(dismissedAt) && Date.now() - dismissedAt < REMIND_AFTER_MS;
  } catch {
    return false;
  }
}

function rememberDismissed(): void {
  try {
    window.localStorage.setItem(SUNSET_DISMISSED_KEY, String(Date.now()));
  } catch {
    // storage unavailable: the notice simply shows again next load
  }
}

export interface SunsetModalProps {
  // Force the modal open regardless of the dismissal record (used by tests).
  forceShow?: boolean;
}

// Site-wide announcement that PromptLab stops taking new users today and
// shuts down on SUNSET_DATE. Shown once per day per browser.
export const SunsetModal = ({ forceShow = false }: SunsetModalProps) => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  // Decide visibility only on the client, after mount, so SSR markup matches.
  useEffect(() => {
    setDaysLeft(daysUntilSunset());
    if (forceShow || !wasRecentlyDismissed()) {
      setShow(true);
    }
  }, [forceShow]);

  const handleClose = () => {
    rememberDismissed();
    setShow(false);
  };

  return (
    <Modal
      className={notoSansThai.className}
      backdropClassName={styles.backdrop}
      dialogClassName={styles.dialog}
      contentClassName={styles.content}
      centered
      show={show}
      onHide={handleClose}
      aria-labelledby="sunset-modal-title"
    >
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.logoRing}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.logo}
              src="/images/prompt_lab_logo.png"
              alt="PromptLab"
            />
          </div>
          <span className={styles.eyebrow}>{t("sunset.eyebrow")}</span>
          <h2 id="sunset-modal-title" className={styles.title}>
            {t("sunset.title")}
          </h2>
          <p className={styles.subtitle}>{t("sunset.subtitle")}</p>
          <span className={styles.countdown} data-testid="sunset-countdown">
            <span aria-hidden="true">⏳</span>
            <span className={styles.countdownNumber}>{daysLeft}</span>
            <span>{t("sunset.countdownUnit")}</span>
          </span>
        </div>
      </div>

      <div className={styles.body}>
        <ol className={styles.timeline}>
          <li className={styles.step}>
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.stepDate}>{t("sunset.step1.date")}</div>
            <div className={styles.stepTitle}>{t("sunset.step1.title")}</div>
            <p className={styles.stepDesc}>{t("sunset.step1.description")}</p>
          </li>
          <li className={styles.step}>
            <span className={`${styles.dot} ${styles.dotEnd}`} aria-hidden="true" />
            <div className={`${styles.stepDate} ${styles.stepDateEnd}`}>
              {t("sunset.step2.date")}
            </div>
            <div className={styles.stepTitle}>{t("sunset.step2.title")}</div>
            <p className={styles.stepDesc}>{t("sunset.step2.description")}</p>
          </li>
        </ol>

        <div className={styles.thanks}>{t("sunset.thanks")}</div>

        <button type="button" className={styles.button} onClick={handleClose}>
          {t("sunset.button")}
        </button>

        <p className={styles.footnote}>
          {t("sunset.footnote")}{" "}
          <Link href="/help" onClick={handleClose}>
            {t("sunset.footnoteLink")}
          </Link>
        </p>
      </div>
    </Modal>
  );
};
