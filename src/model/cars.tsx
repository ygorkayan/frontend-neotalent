import { useState, useEffect } from "react";
import { type Car, getCars } from "../services/getCars";
import {
  filterByMake,
  filterByModel,
  filterByMinBid,
  filterByMaxBid,
  filterByFavorite,
  clearFilters,
  formatFilters,
} from "./utils";

export const orderbyOptions = [
  { value: "price-asc", label: "Make: Alphabetical order" },
  { value: "price-desc", label: "Make: Alphabetical inverse order" },

  { value: "year-asc", label: "Starting Bid: Low to High" },
  { value: "year-desc", label: "Starting Bid: High to Low" },

  { value: "year-asc", label: "Milage: Low to High" },
  { value: "year-desc", label: "Milage: High to Low" },

  { value: "year-asc", label: "Auction date: Oldest to Newest" },
  { value: "year-desc", label: "Auction date: Newest to Oldest" },
];

export const pageSizeOptions = [
  { value: "6", label: "6 vehicles" },
  { value: "12", label: "12 vehicles" },
  { value: "24", label: "24 vehicles" },
];

export type Filter = {
  name: string;
  value: string;
  filter: (car: Car) => boolean;
};

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const makes = Array.from(new Set(cars.map((car) => car.make)));

  useEffect(() => {
    const fetchedCars = getCars();
    setCars(fetchedCars);
  }, []);

  return {
    cars: cars.filter((car) => filters.every((filter) => filter.filter(car))),
    makes,
    filters: {
      filterByMake: filterByMake(setFilters),
      filterByModel: filterByModel(setFilters),
      filterByMinBid: filterByMinBid(setFilters),
      filterByMaxBid: filterByMaxBid(setFilters),
      filterByFavorite: filterByFavorite(setFilters),
      clearFilters: clearFilters(setFilters),
    },
    filtersApplied: formatFilters(filters),
  };
};
