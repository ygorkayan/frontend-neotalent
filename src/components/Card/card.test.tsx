// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Card from "./Card";

vi.mock("./Util", () => ({
  useCountdown: () => ({
    remainingDays: 3,
    remainingHours: 4,
    auctionHasStarted: false,
    date: "01 Aug 2026, 12:00 BST",
  }),
}));

const defaultProps = {
  auctionStartsAt: "2026-08-01T12:00:00",
  startingBid: 12000,
  make: "BMW",
  model: "320d",
  engineSize: "2.0L",
  fuelType: "Diesel",
  year: 2019,
  mileage: 45000,
  isFavorite: false,
  onFavoriteClick: vi.fn(),
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Card", () => {
  it("renders the vehicle and auction information", () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText("BMW 320d")).toBeInTheDocument();
    expect(screen.getByText("2.0L - 2019")).toBeInTheDocument();
    expect(screen.getByText("45000")).toBeInTheDocument();
    expect(screen.getByText("Diesel")).toBeInTheDocument();
    expect(screen.getByText("Starting Bid")).toBeInTheDocument();
    expect(screen.getByText("12000")).toBeInTheDocument();
    expect(screen.getByText("01 Aug 2026, 12:00 BST")).toBeInTheDocument();
    expect(screen.getByText("Auction starts in")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("calls onFavoriteClick when the user clicks the favorite button", async () => {
    const user = userEvent.setup();
    const onFavoriteClick = vi.fn();

    render(<Card {...defaultProps} onFavoriteClick={onFavoriteClick} />);

    const favoriteButton = screen.getByRole("button", { name: "Add to favorites" });
    expect(favoriteButton).toHaveAttribute("aria-pressed", "false");

    await user.click(favoriteButton);

    expect(onFavoriteClick).toHaveBeenCalledOnce();
  });

  it("shows the active state when the vehicle is a favorite", () => {
    render(<Card {...defaultProps} isFavorite />);

    const favoriteButton = screen.getByRole("button", { name: "Remove from favorites" });
    expect(favoriteButton).toHaveAttribute("aria-pressed", "true");
  });
});
