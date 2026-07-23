// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Car } from "../services/getCars";
import { useCars } from "./cars";

function createCar(
  id: number,
  make: string,
  model: string,
  startingBid: number,
  mileage: number,
  favorite = false,
): Car {
  return {
    id,
    make,
    model,
    startingBid,
    mileage,
    favorite,
    engineSize: "2.0L",
    fuelType: "Petrol",
    year: 2020,
    auctionDateTime: `2026-08-${id.toString().padStart(2, "0")}T12:00:00`,
    details: {
      specification: {
        vehicleType: "Saloon",
        colour: "Black",
        fuel: "Petrol",
        transmission: "Automatic",
        numberOfDoors: 4,
        co2Emissions: "120 g/km",
        noxEmissions: "0.03 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2020-01-01",
      },
      equipment: [],
    },
  };
}

const cars = [
  createCar(1, "BMW", "320d", 12000, 45000),
  createCar(2, "Audi", "A3", 9000, 60000, true),
  createCar(3, "Tesla", "Model 3", 25000, 20000),
  createCar(4, "BMW", "X5", 30000, 35000, true),
  createCar(5, "Ford", "Focus", 8000, 74000),
  createCar(6, "Kia", "Sportage", 23000, 12000),
  createCar(7, "Renault", "Clio", 7000, 33000),
  createCar(8, "Volvo", "XC40", 20000, 41000, true),
];

beforeEach(() => {
  localStorage.setItem("cars", JSON.stringify(cars));
  vi.spyOn(console, "log").mockImplementation(() => undefined);
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("useCars", () => {
  it("returns the first page and initial pagination data", () => {
    const { result } = renderHook(() => useCars());

    expect(result.current.cars.map((car) => car.id)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(result.current.makes).toEqual(["BMW", "Audi", "Tesla", "Ford", "Kia", "Renault", "Volvo"]);
    expect(result.current.pagination).toMatchObject({ currentPage: 1, totalPages: 2, pageSize: "6" });
  });

  it("changes pages and the number of cars per page", () => {
    const { result } = renderHook(() => useCars());

    act(() => result.current.pagination.setPage(2));
    expect(result.current.cars.map((car) => car.id)).toEqual([7, 8]);
    expect(result.current.pagination.currentPage).toBe(2);

    act(() => result.current.pagination.setPageSize("12"));
    expect(result.current.cars).toHaveLength(8);
    expect(result.current.pagination).toMatchObject({ currentPage: 1, totalPages: 1, pageSize: "12" });

    act(() => result.current.pagination.setPageSize("7"));
    expect(result.current.pagination.pageSize).toBe("12");
  });

  it("combines text filters and clears them", () => {
    const { result } = renderHook(() => useCars());

    act(() => result.current.filters.filterByMake("BMW"));
    expect(result.current.cars.map((car) => car.id)).toEqual([1, 4]);

    act(() => result.current.filters.filterByModel("X5"));
    expect(result.current.cars.map((car) => car.id)).toEqual([4]);
    expect(result.current.filters.filtersApplied).toEqual([
      { name: "Make", value: "BMW" },
      { name: "Model", value: "X5" },
    ]);

    act(() => result.current.filters.clearFilters());
    expect(result.current.cars.map((car) => car.id)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(result.current.filters.filtersApplied).toEqual([]);
  });

  it("combines bid and favorite filters", () => {
    const { result } = renderHook(() => useCars());

    act(() => result.current.filters.filterByMinBid(20000));
    act(() => result.current.filters.filterByMaxBid(25000));
    act(() => result.current.filters.filterByFavorite(true));

    expect(result.current.cars.map((car) => car.id)).toEqual([8]);
    expect(result.current.pagination.totalPages).toBe(1);
  });

  it("orders cars and exposes the current order", () => {
    const { result } = renderHook(() => useCars());

    act(() => result.current.orderBy.setOrder("make-asc"));

    expect(result.current.cars.map((car) => `${car.make} ${car.model}`)).toEqual([
      "Audi A3",
      "BMW 320d",
      "BMW X5",
      "Ford Focus",
      "Kia Sportage",
      "Renault Clio",
    ]);
    expect(result.current.orderBy.currentOrder).toBe("make-asc");
  });

  it("updates a favorite car in state and localStorage", () => {
    const { result } = renderHook(() => useCars());

    act(() => result.current.favoriteCar(1));

    expect(result.current.cars.find((car) => car.id === 1)?.favorite).toBe(true);

    const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") ?? "[]");
    expect(storedCars.find((car) => car.id === 1)?.favorite).toBe(true);
  });
});
