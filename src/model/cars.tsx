import { useState, useEffect } from "react";
import { type Car, getCars } from "../services/getCars";

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

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  const makes = Array.from(new Set(cars.map((car) => car.make)));

  useEffect(() => {
    const fetchedCars = getCars();
    setCars(fetchedCars);
    setFilteredCars(fetchedCars);
  }, []);

  const filterByMake = (make: string) => {
    const filtered = cars.filter((car) => car.make === make);
    setFilteredCars(filtered);
  };

  const filterByModel = (model: string) => {
    const filtered = cars.filter((car) => car.model === model);
    setFilteredCars(filtered);
  };

  const filterByBid = (minBid: number, maxBid: number) => {
    const filtered = cars.filter((car) => car.startingBid >= minBid && car.startingBid <= maxBid);
    setFilteredCars(filtered);
  };

  const filterByFavorite = (favorite: boolean) => {
    const filtered = cars.filter((car) => car.favorite === favorite);
    setFilteredCars(filtered);
  };

  const clearFilters = () => {
    setFilteredCars(cars);
  };

  return {
    cars: filteredCars,
    makes,
    filters: {
      filterByMake: filterByMake,
      filterByModel: filterByModel,
      filterByBid: filterByBid,
      filterByFavorite: filterByFavorite,
      clearFilters: clearFilters,
    },
  };
};
