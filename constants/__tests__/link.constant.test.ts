import { urlLinks, paymentApiUrl } from "@/constants/link.constant";

describe("link constants", () => {
  it("defines a titleKey and href for every nav link", () => {
    expect(urlLinks.length).toBeGreaterThan(0);
    urlLinks.forEach((link) => {
      expect(typeof link.titleKey).toBe("string");
      expect(link.href.startsWith("/")).toBe(true);
    });
  });

  it("has no trailing slash on the payment API base URL", () => {
    expect(paymentApiUrl.endsWith("/")).toBe(false);
  });
});
