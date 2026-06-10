import { formatNumber } from "@/utils/number";

describe("formatNumber", () => {
  it("formats numbers with thousand separators and no fraction digits", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
    expect(formatNumber(1234.6)).toBe("1,235");
  });

  it("returns 0 for undefined", () => {
    expect(formatNumber(undefined)).toBe(0);
  });

  it("returns 0 for zero", () => {
    expect(formatNumber(0)).toBe(0);
  });
});
