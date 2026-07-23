import type { Car } from "../services/getCars";
import type { Filter } from "./cars";

const updateFilter = (
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>,
  filterName: string,
  newFilter?: Filter,
) => {
  setFilters((prevFilters) => {
    const filtersWithoutCurrent = prevFilters.filter((filter) => filter.name !== filterName);
    return newFilter ? [...filtersWithoutCurrent, newFilter] : filtersWithoutCurrent;
  });
};

export const filterByMake = (setFilters: React.Dispatch<React.SetStateAction<Filter[]>>) => (make: string) => {
  const filterName = "make";
  const filterValue = make.trim();

  if (!filterValue) {
    updateFilter(setFilters, filterName);
    return;
  }

  const filterFunction = (car: Car) => car.make === filterValue;

  const newFilter: Filter = { name: filterName, value: filterValue, filter: filterFunction };

  updateFilter(setFilters, filterName, newFilter);
};

export const filterByModel = (setFilters: React.Dispatch<React.SetStateAction<Filter[]>>) => (model: string) => {
  const filterName = "model";
  const filterValue = model.trim();

  if (!filterValue) {
    updateFilter(setFilters, filterName);
    return;
  }

  const filterFunction = (car: Car) => car.model.includes(filterValue);

  const newFilter: Filter = { name: filterName, value: filterValue, filter: filterFunction };

  updateFilter(setFilters, filterName, newFilter);
};

export const filterByMinBid =
  (setFilters: React.Dispatch<React.SetStateAction<Filter[]>>) => (minBid: number | null) => {
    const filterName = "minBid";

    if (minBid === null || Number.isNaN(minBid) || minBid <= 0) {
      updateFilter(setFilters, filterName);
      return;
    }

    const filterValue = minBid.toString();
    const filterFunction = (car: Car) => car.startingBid >= minBid;

    const newFilter: Filter = { name: filterName, value: filterValue, filter: filterFunction };

    updateFilter(setFilters, filterName, newFilter);
  };

export const filterByMaxBid =
  (setFilters: React.Dispatch<React.SetStateAction<Filter[]>>) => (maxBid: number | null) => {
    const filterName = "maxBid";

    if (maxBid === null || Number.isNaN(maxBid) || maxBid <= 0) {
      updateFilter(setFilters, filterName);
      return;
    }

    const filterValue = maxBid.toString();
    const filterFunction = (car: Car) => car.startingBid <= maxBid;

    const newFilter: Filter = { name: filterName, value: filterValue, filter: filterFunction };

    updateFilter(setFilters, filterName, newFilter);
  };

export const filterByFavorite = (setFilters: React.Dispatch<React.SetStateAction<Filter[]>>) => (favorite: boolean) => {
  const filterName = "favorite";

  if (!favorite) {
    updateFilter(setFilters, filterName);
    return;
  }

  const filterValue = favorite.toString();
  const filterFunction = (car: Car) => car.favorite === favorite;

  const newFilter: Filter = { name: filterName, value: filterValue, filter: filterFunction };

  updateFilter(setFilters, filterName, newFilter);
};

export const clearFilters = (setFilters: React.Dispatch<React.SetStateAction<Filter[]>>) => () => {
  setFilters([]);
};

export type FilterWhiteoutFn = {
  name: string;
  value: string;
};

export const formatFilters = (filters: Filter[]): FilterWhiteoutFn[] => {
  const parseName: Record<string, string> = {
    make: "Make",
    model: "Model",
    minBid: "Min Bid",
    maxBid: "Max Bid",
    favorite: "Favorite",
  };

  return filters.map((filter) => {
    return {
      name: parseName[filter.name],
      value: filter.value,
    };
  });
};

export const favoriteCar = (setCars: React.Dispatch<React.SetStateAction<Car[]>>) => (id: number) => {
  setCars((prevCars) => prevCars.map((car) => (car.id === id ? { ...car, favorite: !car.favorite } : car)));
};

export const orderCars =
  (
    cars: Car[],
    setOrder: React.Dispatch<React.SetStateAction<string | undefined>>,
    setCars: React.Dispatch<React.SetStateAction<Car[]>>,
  ) =>
  (order: string) => {
    const sortedCars = [...cars];

    switch (order) {
      case "make-asc":
        sortedCars.sort((a, b) => a.make.localeCompare(b.make));
        break;
      case "make-desc":
        sortedCars.sort((a, b) => b.make.localeCompare(a.make));
        break;
      case "bid-asc":
        sortedCars.sort((a, b) => a.startingBid - b.startingBid);
        break;
      case "bid-desc":
        sortedCars.sort((a, b) => b.startingBid - a.startingBid);
        break;
      case "milage-asc":
        sortedCars.sort((a, b) => a.mileage - b.mileage);
        break;
      case "milage-desc":
        sortedCars.sort((a, b) => b.mileage - a.mileage);
        break;
      case "auction-asc":
        sortedCars.sort((a, b) => new Date(a.auctionDateTime).getTime() - new Date(b.auctionDateTime).getTime());
        break;
      case "auction-desc":
        sortedCars.sort((a, b) => new Date(b.auctionDateTime).getTime() - new Date(a.auctionDateTime).getTime());
        break;
      default:
        break;
    }

    setOrder(order);
    setCars(sortedCars);
  };
