import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import {
  SunsetModal,
  SUNSET_DISMISSED_KEY,
  daysUntilSunset,
} from "@/common/Modals/SunsetModal";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "th" },
  }),
}));

jest.mock("next/font/google", () => ({
  Noto_Sans_Thai: () => ({ className: "noto-sans-thai" }),
}));

describe("daysUntilSunset", () => {
  it("counts whole days until 30 December 2026", () => {
    expect(daysUntilSunset(dayjs("2026-10-08"))).toBe(83);
    expect(daysUntilSunset(dayjs("2026-12-30"))).toBe(0);
  });

  it("never goes negative after the closing date", () => {
    expect(daysUntilSunset(dayjs("2027-01-15"))).toBe(0);
  });
});

describe("SunsetModal", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows the announcement on first visit and hides it after dismissal", async () => {
    render(<SunsetModal />);

    await waitFor(() => {
      expect(screen.getByText("sunset.title")).toBeInTheDocument();
    });
    expect(screen.getByText("sunset.step1.title")).toBeInTheDocument();
    expect(screen.getByText("sunset.step2.title")).toBeInTheDocument();
    expect(screen.getByText("sunset.thanks")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "sunset.button" }));

    await waitFor(() => {
      expect(screen.queryByText("sunset.title")).not.toBeInTheDocument();
    });
    expect(window.localStorage.getItem(SUNSET_DISMISSED_KEY)).not.toBeNull();
  });

  it("stays hidden when dismissed less than a day ago", () => {
    window.localStorage.setItem(SUNSET_DISMISSED_KEY, String(Date.now()));

    render(<SunsetModal />);

    expect(screen.queryByText("sunset.title")).not.toBeInTheDocument();
  });

  it("shows again when the dismissal is older than a day", async () => {
    const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(SUNSET_DISMISSED_KEY, String(twoDaysAgo));

    render(<SunsetModal />);

    await waitFor(() => {
      expect(screen.getByText("sunset.title")).toBeInTheDocument();
    });
  });

  it("can be forced open regardless of the dismissal record", async () => {
    window.localStorage.setItem(SUNSET_DISMISSED_KEY, String(Date.now()));

    render(<SunsetModal forceShow />);

    await waitFor(() => {
      expect(screen.getByText("sunset.title")).toBeInTheDocument();
    });
  });
});
