// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FallBackMsg from "./FallBackMsg";

describe("FallBackMsg", () => {
  it("renders the empty-state title and guidance", () => {
    render(<FallBackMsg />);

    expect(screen.getByRole("heading", { name: "No vehicles found" })).toBeInTheDocument();
    expect(screen.getByText("Try adjusting or clearing the filters to see more vehicles.")).toBeInTheDocument();
  });
});
