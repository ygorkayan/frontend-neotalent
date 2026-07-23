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

function Home() {
  const { cars, makes, filters, favoriteCar, orderBy } = useCars();

  const makeOptions = makes.map((make) => ({
    value: make,
    label: make,
  }));

  const makeSelectedValue = filters.filtersApplied.find((filter) => filter.name === "Make")?.value || "";
  const modelSelectedValue = filters.filtersApplied.find((filter) => filter.name === "Model")?.value || "";
  const minBidSelectedValue = filters.filtersApplied.find((filter) => filter.name === "Min Bid")?.value || "";
  const maxBidSelectedValue = filters.filtersApplied.find((filter) => filter.name === "Max Bid")?.value || "";
  const favoriteSelectedValue = filters.filtersApplied.find((filter) => filter.name === "Favorite")?.value || "";

  const FilterFields = (
    <>
      <Select options={makeOptions} value={makeSelectedValue} placeholder="Make" onChange={filters.filterByMake} />

      <InputText placeholder="Model" value={modelSelectedValue} onChange={filters.filterByModel} />

      <BidContainer>
        <InputNumber placeholder="Min bid" value={minBidSelectedValue} onChange={filters.filterByMinBid} />

        <InputNumber placeholder="Max bid" value={maxBidSelectedValue} onChange={filters.filterByMaxBid} />
      </BidContainer>

      <Checkbox label="Only favorite" value={favoriteSelectedValue} onChange={filters.filterByFavorite} />
    </>
  );

  const pillsList = filters.filtersApplied.map((filter) => (
    <Pill key={filter.name}>
      {filter.name}: {filter.value}
    </Pill>
  ));

  const carsList = cars.map((car) => (
    <Card
      key={car.id}
      year={car.year}
      make={car.make}
      model={car.model}
      mileage={car.mileage}
      fuelType={car.fuelType}
      isFavorite={car.favorite}
      engineSize={car.engineSize}
      startingBid={car.startingBid}
      auctionStartsAt={car.auctionDateTime}
      onFavoriteClick={() => favoriteCar(car.id)}
    />
  ));

  return (
    <Container>
      <FiltersContainer>{FilterFields}</FiltersContainer>

      <ContentContainer>
        <Header>
          <NavigationRails>{FilterFields}</NavigationRails>

          {pillsList}

          {filters.filtersApplied.length > 0 && <Button onClick={filters.clearFilters}>Clear filters</Button>}

          <OrderByContainer>
            <Select
              options={orderbyOptions}
              value={orderBy.currentOrder}
              onChange={orderBy.setOrder}
              placeholder="Order by"
            />
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
