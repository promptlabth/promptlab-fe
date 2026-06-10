import { delay } from "@/utils/time";
import { formatDate } from "@/utils/date";

describe("delay", () => {
  it("resolves after the given number of milliseconds", async () => {
    jest.useFakeTimers();
    const pending = delay(1000);

    jest.advanceTimersByTime(1000);
    await expect(pending).resolves.toBeUndefined();

    jest.useRealTimers();
  });
});

describe("formatDate", () => {
  it("formats a date as a UTC string", () => {
    const date = new Date(Date.UTC(2026, 0, 15, 12, 30, 0));
    expect(formatDate(date)).toBe("Thu, 15 Jan 2026 12:30:00 GMT");
  });
});
