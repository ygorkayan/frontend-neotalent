// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Button from "./Button";

afterEach(cleanup);

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Clear filters</Button>);

    expect(screen.getByRole("button", { name: "Clear filters" })).toBeInTheDocument();
  });

  it("calls the click handler when the user clicks it", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Clear filters</Button>);

    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
