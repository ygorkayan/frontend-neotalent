// it's just a mock data for now, in a real app this would be fetched from an API
export function getCars() {
  const carsLocal = localStorage.getItem("cars");

  // it is a kind of cache to avoid go to the server if there are the data
  if (carsLocal) {
    console.log("Fetching cars from localStorage...");
    return JSON.parse(carsLocal);
  }

  console.log("Fetching cars...");
  localStorage.setItem("cars", JSON.stringify(cars));
  return cars;
}

export interface Car {
  id: number;
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
  {
    id: 4,
    make: "Mercedes-Benz",
    model: "C300",
    engineSize: "2.0L",
    fuelType: "Petrol",
    year: 2020,
    mileage: 38500,
    auctionDateTime: "2026-05-02T11:30:00",
    startingBid: 18500,
    favorite: true,
    details: {
      specification: {
        vehicleType: "Saloon",
        colour: "Silver",
        fuel: "Petrol",
        transmission: "Automatic",
        numberOfDoors: 4,
        co2Emissions: "145 g/km",
        noxEmissions: "0.025 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 2,
        dateOfRegistration: "2020-02-18",
      },
      equipment: ["Leather Seats", "Reversing Camera", "LED Headlights"],
    },
  },
  {
    id: 5,
    make: "Volkswagen",
    model: "Golf",
    engineSize: "1.5L",
    fuelType: "Petrol",
    year: 2019,
    mileage: 52000,
    auctionDateTime: "2026-05-04T14:00:00",
    startingBid: 10500,
    favorite: false,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "Blue",
        fuel: "Petrol",
        transmission: "Manual",
        numberOfDoors: 5,
        co2Emissions: "116 g/km",
        noxEmissions: "0.021 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2019-09-07",
      },
      equipment: ["Adaptive Cruise Control", "Apple CarPlay", "Parking Sensors"],
    },
  },
  {
    id: 6,
    make: "Toyota",
    model: "Corolla",
    engineSize: "1.8L",
    fuelType: "Hybrid",
    year: 2022,
    mileage: 17000,
    auctionDateTime: "2026-05-06T09:45:00",
    startingBid: 16000,
    favorite: true,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "Grey",
        fuel: "Hybrid",
        transmission: "Automatic",
        numberOfDoors: 5,
        co2Emissions: "102 g/km",
        noxEmissions: "0.008 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2022-04-21",
      },
      equipment: ["Lane Assist", "Heated Seats", "Reversing Camera"],
    },
  },
  {
    id: 7,
    make: "Ford",
    model: "Focus",
    engineSize: "1.0L",
    fuelType: "Petrol",
    year: 2017,
    mileage: 74500,
    auctionDateTime: "2026-05-08T16:15:00",
    startingBid: 6500,
    favorite: false,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "Red",
        fuel: "Petrol",
        transmission: "Manual",
        numberOfDoors: 5,
        co2Emissions: "108 g/km",
        noxEmissions: "0.026 g/km",
        numberOfKeys: 1,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 3,
        dateOfRegistration: "2017-11-12",
      },
      equipment: ["Air Conditioning", "Bluetooth", "Heated Windscreen"],
    },
  },
  {
    id: 8,
    make: "Volvo",
    model: "XC40",
    engineSize: "2.0L",
    fuelType: "Diesel",
    year: 2020,
    mileage: 41000,
    auctionDateTime: "2026-05-11T13:30:00",
    startingBid: 21000,
    favorite: false,
    details: {
      specification: {
        vehicleType: "SUV",
        colour: "White",
        fuel: "Diesel",
        transmission: "Automatic",
        numberOfDoors: 5,
        co2Emissions: "131 g/km",
        noxEmissions: "0.035 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 2,
        dateOfRegistration: "2020-07-03",
      },
      equipment: ["Pilot Assist", "Navigation", "Power Tailgate"],
    },
  },
  {
    id: 9,
    make: "Nissan",
    model: "Leaf",
    engineSize: "Electric",
    fuelType: "Electric",
    year: 2021,
    mileage: 29500,
    auctionDateTime: "2026-05-14T10:20:00",
    startingBid: 12500,
    favorite: true,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "Black",
        fuel: "Electric",
        transmission: "Automatic",
        numberOfDoors: 5,
        co2Emissions: "0 g/km",
        noxEmissions: "0 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2021-01-29",
      },
      equipment: ["ProPILOT", "Fast Charging", "Heated Steering Wheel"],
    },
  },
  {
    id: 10,
    make: "Honda",
    model: "Civic",
    engineSize: "1.5L",
    fuelType: "Petrol",
    year: 2018,
    mileage: 56500,
    auctionDateTime: "2026-05-16T12:45:00",
    startingBid: 9800,
    favorite: false,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "Blue",
        fuel: "Petrol",
        transmission: "Manual",
        numberOfDoors: 5,
        co2Emissions: "133 g/km",
        noxEmissions: "0.029 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 2,
        dateOfRegistration: "2018-05-16",
      },
      equipment: ["Collision Warning", "Climate Control", "DAB Radio"],
    },
  },
  {
    id: 11,
    make: "Kia",
    model: "Sportage",
    engineSize: "1.6L",
    fuelType: "Hybrid",
    year: 2023,
    mileage: 12000,
    auctionDateTime: "2026-05-19T15:00:00",
    startingBid: 23500,
    favorite: true,
    details: {
      specification: {
        vehicleType: "SUV",
        colour: "Green",
        fuel: "Hybrid",
        transmission: "Automatic",
        numberOfDoors: 5,
        co2Emissions: "126 g/km",
        noxEmissions: "0.011 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2023-03-24",
      },
      equipment: ["Panoramic Roof", "Blind Spot Assist", "Wireless Charging"],
    },
  },
  {
    id: 12,
    make: "Mazda",
    model: "CX-5",
    engineSize: "2.0L",
    fuelType: "Petrol",
    year: 2019,
    mileage: 48000,
    auctionDateTime: "2026-05-22T11:10:00",
    startingBid: 14500,
    favorite: false,
    details: {
      specification: {
        vehicleType: "SUV",
        colour: "Red",
        fuel: "Petrol",
        transmission: "Automatic",
        numberOfDoors: 5,
        co2Emissions: "152 g/km",
        noxEmissions: "0.023 g/km",
        numberOfKeys: 2,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 2,
        dateOfRegistration: "2019-10-05",
      },
      equipment: ["Bose Sound System", "Head-Up Display", "Keyless Entry"],
    },
  },
  {
    id: 13,
    make: "Renault",
    model: "Clio",
    engineSize: "1.0L",
    fuelType: "Petrol",
    year: 2020,
    mileage: 33500,
    auctionDateTime: "2026-05-24T09:30:00",
    startingBid: 8200,
    favorite: false,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "Orange",
        fuel: "Petrol",
        transmission: "Manual",
        numberOfDoors: 5,
        co2Emissions: "119 g/km",
        noxEmissions: "0.018 g/km",
        numberOfKeys: 1,
      },
      ownership: {
        logbook: "Yes",
        numberOfOwners: 1,
        dateOfRegistration: "2020-08-14",
      },
      equipment: ["Touchscreen Display", "Lane Departure Warning", "Bluetooth"],
    },
  },
];
