// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCountdown } from "../../components/Card/Util";
import { useCars } from "../../model/cars";
import type { Car } from "../../services/getCars";
import Details from "./Details";

vi.mock("../../components/Card/Util", async function mockCardUtils(importOriginal) {
  const actual = await importOriginal<typeof import("../../components/Card/Util")>();

  return {
    ...actual,
    useCountdown: vi.fn(),
  };
});

vi.mock("../../model/cars", function mockCarsModel() {
  return {
    useCars: vi.fn(),
  };
});

const car: Car = {
  id: 1,
  make: "BMW",
  model: "320d",
  engineSize: "2.0L",
  fuelType: "Diesel",
  year: 2019,
  mileage: 45000,
  auctionDateTime: "2026-08-01T12:00:00Z",
  startingBid: 12000,
  favorite: false,
  details: {
    specification: {
      vehicleType: "Saloon",
      colour: "Black",
      fuel: "Diesel",
      transmission: "Automatic",
      numberOfDoors: 4,
      co2Emissions: "120 g/km",
      noxEmissions: "0.03 g/km",
      numberOfKeys: 2,
    },
    ownership: {
      logbook: "Yes",
      numberOfOwners: 2,
      dateOfRegistration: "2019-06-15T12:00:00Z",
    },
    equipment: ["Navigation", "Bluetooth"],
  },
};

const mockedUseCars = vi.mocked(useCars);
const mockedUseCountdown = vi.mocked(useCountdown);
const getCarById = vi.fn<(id: number) => Car | undefined>();

function createUseCarsResult(): ReturnType<typeof useCars> {
  return {
    getCarById,
    cars: [],
    makes: [],
    filters: {
      filterByMake: vi.fn(),
      filterByModel: vi.fn(),
      filterByMinBid: vi.fn(),
      filterByMaxBid: vi.fn(),
      filterByFavorite: vi.fn(),
      clearFilters: vi.fn(),
      filtersApplied: [],
    },
    favoriteCar: vi.fn(),
    orderBy: {
      currentOrder: undefined,
      setOrder: vi.fn(),
    },
    pagination: {
      currentPage: 1,
      totalPages: 0,
      pageSize: "6",
      setPage: vi.fn(),
      setPageSize: vi.fn(),
    },
  };
}

function renderDetails(path = "/vehicle/1") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/vehicle/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  getCarById.mockReturnValue(car);
  mockedUseCars.mockReturnValue(createUseCarsResult());
  mockedUseCountdown.mockReturnValue({
    now: 0,
    date: "01 Aug 2026, 13:00 BST",
    remainingDays: 3,
    remainingHours: 4,
    auctionHasStarted: false,
    remainingMilliseconds: 273_600_000,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Details", () => {
  it("renders the selected vehicle information", () => {
    renderDetails();

    expect(getCarById).toHaveBeenCalledWith(1);
    expect(screen.getByRole("heading", { name: "BMW 320d" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "BMW 320d" })).toBeInTheDocument();
    expect(screen.getByText("£12,000")).toBeInTheDocument();
    expect(screen.getByText("45,000 miles")).toBeInTheDocument();
    expect(screen.getByText("3 days 4 hours")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Specification" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ownership" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Equipment" })).toBeInTheDocument();
    expect(screen.getByText("15 June 2019")).toBeInTheDocument();
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Back to vehicles" })).toHaveAttribute("href", "/");
  });

  it("renders an active auction", () => {
    mockedUseCountdown.mockReturnValue({
      now: 0,
      date: "01 Aug 2026, 13:00 BST",
      remainingDays: 0,
      remainingHours: 0,
      auctionHasStarted: true,
      remainingMilliseconds: 0,
    });

    renderDetails();

    expect(screen.getByText("Auction started")).toBeInTheDocument();
    expect(screen.getByText("Accepting bids now")).toBeInTheDocument();
  });

  it("renders the fallback when the vehicle does not exist", () => {
    getCarById.mockReturnValue(undefined);

    renderDetails("/vehicle/999");

    expect(getCarById).toHaveBeenCalledWith(999);
    expect(screen.getByRole("heading", { name: "Vehicle not found" })).toBeInTheDocument();
    expect(screen.getByText("The vehicle may have been removed or the address may be incorrect.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "← Back to vehicles" })).toHaveAttribute("href", "/");
  });
});
