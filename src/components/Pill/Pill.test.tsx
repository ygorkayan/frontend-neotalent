// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Pill from "./Pill";

afterEach(cleanup);

describe("Pill", () => {
  it("renders its children", () => {
    render(<Pill>Make: BMW</Pill>);

    expect(screen.getByText("Make: BMW")).toBeInTheDocument();
  });
});
