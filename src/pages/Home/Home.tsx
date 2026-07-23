import styled from "styled-components";

import Select from "../../components/Select/Select";
import InputText from "../../components/InputText/InputText";
import InputNumber from "../../components/InputNumber/InputNumber";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import Pill from "../../components/Pill/Pill";
import Pagination from "../../components/Pagination/Pagination";
import NavigationRails from "../../components/NavigationRails/NavigationRails";

import Card from "../../components/Card/Card";

import { useCars, orderbyOptions, pageSizeOptions } from "../../model/cars";

const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "hamster", label: "Hamster" },
  { value: "parrot", label: "Parrot" },
  { value: "spider", label: "Spider" },
  { value: "goldfish", label: "Goldfish" },
];

function Home() {
  const { cars, makes, filters } = useCars();

  const makeOptions = makes.map((make) => ({
    value: make,
    label: make,
  }));

  const FilterFields = (
    <>
      <Select options={makeOptions} placeholder="Make" onChange={filters.filterByMake} />

      <InputText placeholder="Model" />

      <BidContainer>
        <InputNumber placeholder="Min bid" />

        <InputNumber placeholder="Max bid" />
      </BidContainer>

      <Checkbox label="Only favorite" />
    </>
  );

  const carsList = cars.map((car) => (
    <Card
      key={`${car.make}-${car.model}-${car.year}`}
      year={car.year}
      model={car.model}
      favorite={car.favorite}
      engineSize={car.engineSize}
      fuelType={car.fuelType}
      startingBid={car.startingBid}
      mileage={car.mileage}
      make={car.make}
      auctionStartsAt={car.auctionDateTime}
    />
  ));

  return (
    <Container>
      <FiltersContainer>{FilterFields}</FiltersContainer>

      <ContentContainer>
        <Header>
          <NavigationRails>{FilterFields}</NavigationRails>

          <Pill>ASDFGH</Pill>

          <Pill>ASDFGH</Pill>

          <Button>Clear filters</Button>

          <OrderByContainer>
            <Select options={orderbyOptions} placeholder="Order by" />
          </OrderByContainer>
        </Header>

        <CardContainer>{carsList}</CardContainer>

        <Footer>
          <Pagination totalPages={5} />

          <PageSizeContainer>
            <Select options={pageSizeOptions} placeholder="Vehicles per page" />
          </PageSizeContainer>
        </Footer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  gap: 32px;
  width: 100%;
  display: flex;
  padding: 32px;
  margin: 0 auto;
  max-width: 1440px;
  justify-content: center;

  @media (max-width: 900px) {
    padding-top: 20px;
  }
`;

const FiltersContainer = styled.div`
  gap: 16px;
  width: 220px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  gap: 16px;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  gap: 16px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const CardContainer = styled.div`
  gap: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
`;

const Footer = styled.div`
  gap: 16px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PageSizeContainer = styled.div`
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`;

const OrderByContainer = styled.div`
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`;

const BidContainer = styled.div`
  gap: 8px;
  display: flex;

  > * {
    flex: 1;
    min-width: 0;
  }
`;

export default Home;
