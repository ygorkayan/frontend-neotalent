// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Pagination from "./Pagination";

afterEach(cleanup);

describe("Pagination", () => {
  it("renders every page and identifies the current page", () => {
    render(<Pagination totalPages={3} currentPage={2} />);

    const pagination = screen.getByRole("navigation", { name: "Pagination" });
    const buttons = within(pagination).getAllByRole("button");

    expect(buttons).toHaveLength(5);
    expect(within(pagination).getByRole("button", { name: "1" })).not.toHaveAttribute("aria-current");
    expect(within(pagination).getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(within(pagination).getByRole("button", { name: "3" })).not.toHaveAttribute("aria-current");
  });

  it("requests a directly selected page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination totalPages={3} currentPage={1} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "3" }));

    expect(onPageChange).toHaveBeenCalledOnce();
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("navigates to the previous and next pages", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination totalPages={3} currentPage={2} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "‹" }));
    await user.click(screen.getByRole("button", { name: "›" }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
  });

  it("disables navigation at the first and last pages", () => {
    const { rerender } = render(<Pagination totalPages={3} currentPage={1} />);

    expect(screen.getByRole("button", { name: "‹" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "›" })).toBeEnabled();

    rerender(<Pagination totalPages={3} currentPage={3} />);

    expect(screen.getByRole("button", { name: "‹" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "›" })).toBeDisabled();
  });
});
