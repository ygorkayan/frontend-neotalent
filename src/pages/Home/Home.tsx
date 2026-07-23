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

const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "hamster", label: "Hamster" },
  { value: "parrot", label: "Parrot" },
  { value: "spider", label: "Spider" },
  { value: "goldfish", label: "Goldfish" },
];

function FilterFields() {
  return (
    <>
      <Select options={options} placeholder="Make" />

      <InputText placeholder="Model" />

      <BidContainer>
        <InputNumber placeholder="Min bid" />

        <InputNumber placeholder="Max bid" />
      </BidContainer>

      <Checkbox label="Only favorite" />
    </>
  );
}

function Home() {
  const pageSizeOptions = [
    { value: "6", label: "6 vehicles" },
    { value: "12", label: "12 vehicles" },
    { value: "24", label: "24 vehicles" },
  ];

  return (
    <Container>
      <FiltersContainer>
        <FilterFields />
      </FiltersContainer>

      <NavigationRails>
        <FilterFields />
      </NavigationRails>

      <ContentContainer>
        <Header>
          <Pill>ASDFGH</Pill>

          <Button>Clear filters</Button>

          <OrderByContainer>
            <Select options={options} placeholder="Order by" />
          </OrderByContainer>
        </Header>

        <CardContainer>
          <Card
            year="2024"
            model="C 300"
            favorite={false}
            engineSize="1.6L"
            fuelType="Diesel"
            startingBid={52900}
            mileage="11 000 mi"
            make="Mercedes-Benz"
            auctionStartsAt="2026-08-20T12:00:00+01:00"
          />

          <Card
            year="2024"
            model="C 300"
            favorite={false}
            engineSize="1.6L"
            fuelType="Diesel"
            startingBid={52900}
            mileage="11 000 mi"
            make="Mercedes-Benz"
            auctionStartsAt="2026-08-20T12:00:00+01:00"
          />

          <Card
            year="2024"
            model="C 300"
            favorite={false}
            engineSize="1.6L"
            fuelType="Diesel"
            startingBid={52900}
            mileage="11 000 mi"
            make="Mercedes-Benz"
            auctionStartsAt="2026-08-20T12:00:00+01:00"
          />

          <Card
            year="2024"
            model="C 300"
            favorite={false}
            engineSize="1.6L"
            fuelType="Diesel"
            startingBid={52900}
            mileage="11 000 mi"
            make="Mercedes-Benz"
            auctionStartsAt="2026-08-20T12:00:00+01:00"
          />

          <Card
            year="2024"
            model="C 300"
            favorite={false}
            engineSize="1.6L"
            fuelType="Diesel"
            startingBid={52900}
            mileage="11 000 mi"
            make="Mercedes-Benz"
            auctionStartsAt="2026-08-20T12:00:00+01:00"
          />

          <Card
            year="2024"
            model="C 300"
            favorite={false}
            engineSize="1.6L"
            fuelType="Diesel"
            startingBid={52900}
            mileage="11 000 mi"
            make="Mercedes-Benz"
            auctionStartsAt="2026-08-20T12:00:00+01:00"
          />
        </CardContainer>

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
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  padding: 32px clamp(16px, 3vw, 40px);
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

  @media (max-width: 600px) {
    align-items: stretch;
  }
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
    align-items: stretch;
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
