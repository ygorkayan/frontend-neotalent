// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Car } from "../../services/getCars";
import { useCars } from "../../model/cars";
import Home from "./Home";

vi.mock("../../model/cars", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../model/cars")>();

  return {
    ...actual,
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
  auctionDateTime: "2026-08-01T12:00:00",
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
      dateOfRegistration: "2019-06-15",
    },
    equipment: ["Navigation"],
  },
};

const mockedUseCars = vi.mocked(useCars);

function createUseCarsResult(): ReturnType<typeof useCars> {
  return {
    getCarById: vi.fn(),
    cars: [car],
    makes: ["BMW", "Audi"],
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
      totalPages: 3,
      pageSize: "6",
      setPage: vi.fn(),
      setPageSize: vi.fn(),
    },
  };
}

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  mockedUseCars.mockReturnValue(createUseCarsResult());
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Home", () => {
  it("renders cars returned by useCars and forwards favorite clicks", async () => {
    const user = userEvent.setup();
    const useCarsResult = createUseCarsResult();
    mockedUseCars.mockReturnValue(useCarsResult);

    renderHome();

    expect(screen.getByText("BMW 320d")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add to favorites" }));
    expect(useCarsResult.favoriteCar).toHaveBeenCalledWith(1);
  });

  it("renders the fallback and hides pagination when there are no cars", () => {
    const useCarsResult = createUseCarsResult();
    useCarsResult.cars = [];
    useCarsResult.pagination.totalPages = 0;
    mockedUseCars.mockReturnValue(useCarsResult);

    renderHome();

    expect(screen.getByRole("status")).toHaveTextContent("No vehicles found");
    expect(screen.queryByRole("navigation", { name: "Pagination" })).not.toBeInTheDocument();
  });

  it("forwards filter changes and clear actions to useCars", async () => {
    const user = userEvent.setup();
    const useCarsResult = createUseCarsResult();
    useCarsResult.filters.filtersApplied = [{ name: "Make", value: "BMW" }];
    mockedUseCars.mockReturnValue(useCarsResult);

    renderHome();

    fireEvent.change(screen.getAllByPlaceholderText("Model")[0], { target: { value: "320d" } });
    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(useCarsResult.filters.filterByModel).toHaveBeenCalledWith("320d");
    expect(useCarsResult.filters.clearFilters).toHaveBeenCalledOnce();
    expect(screen.getByText("Make: BMW")).toBeInTheDocument();
  });

  it("forwards page and page-size changes to useCars", async () => {
    const user = userEvent.setup();
    const useCarsResult = createUseCarsResult();
    mockedUseCars.mockReturnValue(useCarsResult);

    renderHome();

    await user.click(screen.getByRole("button", { name: "2" }));
    await user.selectOptions(screen.getByDisplayValue("6 vehicles"), "12");

    expect(useCarsResult.pagination.setPage).toHaveBeenCalledWith(2);
    expect(useCarsResult.pagination.setPageSize).toHaveBeenCalledWith("12");
  });
});
