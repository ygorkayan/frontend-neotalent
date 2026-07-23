import { useState } from "react";
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
  const [cars, setCars] = useState<Car[]>(getCars);
  const [order, setOrder] = useState<string>();
  const [filters, setFilters] = useState<Filter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const makes = Array.from(new Set(cars.map((car) => car.make)));
  const filteredCars = cars.filter((car) => filters.every((filter) => filter.filter(car)));
  const totalPages = Math.ceil(filteredCars.length / pageSize);
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const firstCarIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedCars = filteredCars.slice(firstCarIndex, firstCarIndex + pageSize);

  const resetPage = () => setCurrentPage(1);

  const changePage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), Math.max(1, totalPages)));
  };

  const changePageSize = (value: string) => {
    const nextPageSize = Number(value);

    if (!pageSizeOptions.some((option) => Number(option.value) === nextPageSize)) return;

    setPageSize(nextPageSize);
    resetPage();
  };

  const applyMakeFilter = (make: string) => {
    filterByMake(setFilters)(make);
    resetPage();
  };

  const applyModelFilter = (model: string) => {
    filterByModel(setFilters)(model);
    resetPage();
  };

  const applyMinBidFilter = (minBid: number | null) => {
    filterByMinBid(setFilters)(minBid);
    resetPage();
  };

  const applyMaxBidFilter = (maxBid: number | null) => {
    filterByMaxBid(setFilters)(maxBid);
    resetPage();
  };

  const applyFavoriteFilter = (favorite: boolean) => {
    filterByFavorite(setFilters)(favorite);
    resetPage();
  };

  const removeFilters = () => {
    clearFilters(setFilters)();
    resetPage();
  };

  return {
    cars: paginatedCars,
    makes,
    filters: {
      filterByMake: applyMakeFilter,
      filterByModel: applyModelFilter,
      filterByMinBid: applyMinBidFilter,
      filterByMaxBid: applyMaxBidFilter,
      filterByFavorite: applyFavoriteFilter,
      clearFilters: removeFilters,
      filtersApplied: formatFilters(filters),
    },
    favoriteCar: favoriteCar(setCars),
    orderBy: {
      currentOrder: order,
      setOrder: orderCars(cars, setOrder, setCars),
    },
    pagination: {
      currentPage: safeCurrentPage,
      totalPages,
      pageSize: pageSize.toString(),
      setPage: changePage,
      setPageSize: changePageSize,
    },
  };
};
