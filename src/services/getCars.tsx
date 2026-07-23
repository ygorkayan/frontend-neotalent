// it's just a mock data for now, in a real app this would be fetched from an API
export function getCars() {
  return cars;
}

export interface Car {
  make: string;
  model: string;
  engineSize: string;
  fuelType: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favorite: boolean;
  details: {
    specification: {
      vehicleType: string;
      colour: string;
      fuel: string;
      transmission: string;
      numberOfDoors: number;
      co2Emissions: string;
      noxEmissions: string;
      numberOfKeys: number;
    };
    ownership: {
      logbook: string;
      numberOfOwners: number;
      dateOfRegistration: string;
    };
    equipment: string[];
  };
}

const cars: Car[] = [
  {
    make: "BMW",
    model: "320d",
    engineSize: "2.0L",
    fuelType: "Diesel",
    year: 2019,
    mileage: 45000,
    auctionDateTime: "2026-04-20T12:00:00",
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
      equipment: ["Air Conditioning", "Navigation", "Bluetooth"],
    },
  },
  {
    make: "Audi",
    model: "A3",
    engineSize: "1.6L",
    fuelType: "Petrol",
    year: 2018,
    mileage: 60000,
    auctionDateTime: "2026-04-22T15:30:00",
    startingBid: 9000,
    favorite: true,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "White",
        fuel: "Petrol",
        transmission: "Manual",
        numberOfDoors: 5,
        co2Emissions: "110 g/km",
        noxEmissions: "0.02 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2018-03-10",
      },
      equipment: ["Cruise Control", "Parking Sensors"],
    },
  },
  {
    make: "Tesla",
    model: "Model 3",
    engineSize: "Electric",
    fuelType: "Electric",
    year: 2021,
    mileage: 20000,
    auctionDateTime: "2026-04-25T10:00:00",
    startingBid: 25000,
    favorite: false,
    details: {
      specification: {
        vehicleType: "Saloon",
        colour: "Red",
        fuel: "Electric",
        transmission: "Automatic",
        numberOfDoors: 4,
        co2Emissions: "0 g/km",
        noxEmissions: "0 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2021-08-01",
      },
      equipment: ["Autopilot", "Heated Seats", "Glass Roof"],
    },
  },
];
