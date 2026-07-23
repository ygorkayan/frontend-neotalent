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
