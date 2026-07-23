// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Select from "./Select";

const options = [
  { value: "bmw", label: "BMW" },
  { value: "audi", label: "Audi" },
];

afterEach(cleanup);

describe("Select", () => {
  it("renders the placeholder, options, and controlled value", () => {
    render(<Select placeholder="Make" options={options} value="audi" />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("audi");
    expect(screen.getByRole("option", { name: "Make" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "BMW" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Audi" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Audi" })).toHaveProperty("selected", true);
  });

  it("calls onChange with the selected option value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select placeholder="Make" options={options} value="" onChange={onChange} />);

    await user.selectOptions(screen.getByRole("combobox"), "bmw");

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("bmw");
  });
});
