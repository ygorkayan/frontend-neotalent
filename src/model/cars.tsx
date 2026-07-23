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
  favoriteCar,
  orderCars,
} from "./utils";

export const orderbyOptions = [
  { value: "make-asc", label: "Make: Alphabetical ascendant" },
  { value: "make-desc", label: "Make: Alphabetical descendant" },

  { value: "bid-asc", label: "Starting Bid: ascendant" },
  { value: "bid-desc", label: "Starting Bid: descendant" },

  { value: "milage-asc", label: "Milage: ascendant" },
  { value: "milage-desc", label: "Milage: descendant" },

  { value: "auction-asc", label: "Auction date: Oldest to Newest" },
  { value: "auction-desc", label: "Auction date: Newest to Oldest" },
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
  const [order, setOrder] = useState<string>();
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
      filtersApplied: formatFilters(filters),
    },
    favoriteCar: favoriteCar(setCars),
    orderBy: {
      currentOrder: order,
      setOrder: orderCars(cars, setOrder, setCars),
    },
  };
};
