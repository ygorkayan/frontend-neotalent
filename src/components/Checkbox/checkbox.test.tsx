// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Checkbox from "./Checkbox";

afterEach(cleanup);

describe("Checkbox", () => {
  it("renders an unchecked checkbox with an accessible label", () => {
    render(<Checkbox label="Favorites only" />);

    expect(screen.getByRole("checkbox", { name: "Favorites only" })).not.toBeChecked();
  });

  it("renders as checked when its value is true", () => {
    render(<Checkbox label="Favorites only" value="true" />);

    expect(screen.getByRole("checkbox", { name: "Favorites only" })).toBeChecked();
  });

  it("calls onChange with the new checked state", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Checkbox label="Favorites only" value="false" onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox", { name: "Favorites only" });

    await user.click(checkbox);
    expect(onChange).toHaveBeenLastCalledWith(true);

    rerender(<Checkbox label="Favorites only" value="true" onChange={onChange} />);
    await user.click(checkbox);
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
