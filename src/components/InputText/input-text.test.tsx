// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import InputText from "./InputText";

afterEach(cleanup);

describe("InputText", () => {
  it("renders a text input with its placeholder and value", () => {
    render(<InputText placeholder="Model" value="320d" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Model");
    expect(input).toHaveValue("320d");
  });

  it("calls onChange with the new text", () => {
    const onChange = vi.fn();
    render(<InputText placeholder="Model" value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Model 3" } });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("Model 3");
  });

  it("calls onChange with an empty string when the input is cleared", () => {
    const onChange = vi.fn();
    render(<InputText placeholder="Model" value="320d" onChange={onChange} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("");
  });
});
