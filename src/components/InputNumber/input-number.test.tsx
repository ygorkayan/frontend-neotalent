// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import InputNumber from "./InputNumber";

afterEach(cleanup);

describe("InputNumber", () => {
  it("renders a numeric input with its placeholder and value", () => {
    render(<InputNumber placeholder="Min bid" value="12000" />);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("placeholder", "Min bid");
    expect(input).toHaveValue(12000);
  });

  it("calls onChange with a number when the value changes", () => {
    const onChange = vi.fn();
    render(<InputNumber placeholder="Min bid" value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "12500" } });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(12500);
  });

  it("calls onChange with null when the input is cleared", () => {
    const onChange = vi.fn();
    render(<InputNumber placeholder="Min bid" value="12000" onChange={onChange} />);

    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "" } });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
