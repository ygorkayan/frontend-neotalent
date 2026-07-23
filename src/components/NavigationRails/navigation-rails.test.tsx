// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import NavigationRails from "./NavigationRails";

afterEach(cleanup);

describe("NavigationRails", () => {
  it("renders its title and content", () => {
    render(
      <NavigationRails title="Vehicle filters">
        <span>Filter fields</span>
      </NavigationRails>,
    );

    expect(screen.getByText("Vehicle filters").tagName).toBe("H2");
    expect(screen.getByText("Filter fields")).toBeInTheDocument();
  });

  it("opens and closes the filters panel", async () => {
    const user = userEvent.setup();
    render(<NavigationRails>Filter fields</NavigationRails>);

    const openButton = screen.getByRole("button", { name: "Open filters", hidden: true });
    const dialog = screen.getByRole("dialog", { hidden: true });

    expect(openButton).toHaveAttribute("aria-expanded", "false");
    expect(dialog).toHaveAttribute("aria-hidden", "true");

    await user.click(openButton);

    expect(openButton).toHaveAttribute("aria-expanded", "true");
    expect(dialog).toHaveAttribute("aria-hidden", "false");

    await user.click(within(dialog).getByRole("button", { name: "Close filters", hidden: true }));

    expect(openButton).toHaveAttribute("aria-expanded", "false");
    expect(dialog).toHaveAttribute("aria-hidden", "true");
  });
});
