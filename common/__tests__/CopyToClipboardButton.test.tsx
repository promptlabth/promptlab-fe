import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CopyToClipboardButton } from "@/common/CopyToClipboardButton";

describe("CopyToClipboardButton", () => {
  it("renders a copy button", () => {
    render(<CopyToClipboardButton message="Hello from Prompt Lab" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-secondary", "btn-sm");
  });
});
