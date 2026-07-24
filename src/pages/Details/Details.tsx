import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { CalendarIcon, FuelIcon, RoadIcon, TimerIcon, FavoriteIcon } from "../../components/Card/Icons";
import { useCountdown, formatPrice } from "../../components/Card/Util";
import { useCars } from "../../model/cars";
import type { Car } from "../../services/getCars";
import { formatDate } from "./utils";
import { useEffect } from "react";

function Details() {
  const { id } = useParams();
  const { getCarById, favoriteCar } = useCars();
  const car = getCarById(Number(id));

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  if (!car) {
    return (
      <Page>
        <NotFoundCard>
          <VehicleType>Vehicle details</VehicleType>
          <h1>Vehicle not found</h1>
          <p>The vehicle may have been removed or the address may be incorrect.</p>
          <BackLink to="/">← Back to vehicles</BackLink>
        </NotFoundCard>
      </Page>
    );
  }

  return <CarDetails car={car} favoriteCar={favoriteCar} />;
}

function CarDetails({ car, favoriteCar }: Readonly<{ car: Car; favoriteCar: (id: number) => void }>) {
  const { remainingDays, remainingHours, auctionHasStarted, date } = useCountdown(car.auctionDateTime);

  function renderEquipment(item: string) {
    return <EquipmentItem key={item}>{item}</EquipmentItem>;
  }

  return (
    <Page>
      <PageHeader>
        <BackLink className="back-button" to="/">
          ← Back to vehicles
        </BackLink>
        <VehicleReference>Vehicle #{car.id}</VehicleReference>
      </PageHeader>

      <Hero>
        <Gallery>
          <CarImage src="/images/car-placeholder.png" alt={`${car.make} ${car.model}`} />

          <FavoriteButton
            type="button"
            className="favorite-button"
            aria-pressed={car.favorite}
            aria-label={car.favorite ? "Remove from favorites" : "Add to favorites"}
            title={car.favorite ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.stopPropagation();
              favoriteCar(car.id);
            }}
          >
            <FavoriteIcon $filled={car.favorite} />
          </FavoriteButton>
        </Gallery>

        <Summary>
          <VehicleType>{car.details.specification.vehicleType}</VehicleType>
          <Title>
            {car.make} {car.model}
          </Title>
          <ModelMeta>
            {car.engineSize} · {car.year}
          </ModelMeta>

          <Price>{formatPrice(car.startingBid)}</Price>
          <PriceLabel>Starting bid</PriceLabel>

          <QuickFacts>
            <QuickFact>
              <RoadIcon />
              <span>{car.mileage.toLocaleString("en-GB")} miles</span>
            </QuickFact>
            <QuickFact>
              <FuelIcon />
              <span>{car.fuelType}</span>
            </QuickFact>
            <QuickFact>
              <CalendarIcon />
              <span>{date}</span>
            </QuickFact>
          </QuickFacts>

          <AuctionStatus aria-live="polite">
            <TimerIcon />
            <div>
              <AuctionLabel>{auctionHasStarted ? "Auction started" : "Auction starts in"}</AuctionLabel>
              <AuctionValue>
                {auctionHasStarted ? "Accepting bids now" : `${remainingDays} days ${remainingHours} hours`}
              </AuctionValue>
            </div>
          </AuctionStatus>
        </Summary>
      </Hero>

      <DetailsGrid>
        <DetailsCard>
          <SectionTitle>Specification</SectionTitle>
          <DefinitionList>
            <DetailItem>
              <span className="name">Vehicle type</span>
              <span className="value">{car.details.specification.vehicleType}</span>
            </DetailItem>
            <DetailItem>
              <span className="name">Colour</span>
              <span className="value">{car.details.specification.colour}</span>
            </DetailItem>
            <DetailItem>
              <span className="name">Fuel</span>
              <span className="value">{car.details.specification.fuel}</span>
            </DetailItem>
            <DetailItem>
              <span className="name">Transmission</span>
              <span className="value">{car.details.specification.transmission}</span>
            </DetailItem>
            <DetailItem>
              <span className="name">Number of doors</span>
              <span className="value">{car.details.specification.numberOfDoors}</span>
            </DetailItem>
            <DetailItem>
              <span className="name">Number of keys</span>
              <span className="value">{car.details.specification.numberOfKeys}</span>
            </DetailItem>
            <DetailItem>
              <span className="name">CO₂ emissions</span>
              <span className="value">{car.details.specification.co2Emissions}</span>
            </DetailItem>
            <DetailItem>
              <span className="name">NOx emissions</span>
              <span className="value">{car.details.specification.noxEmissions}</span>
            </DetailItem>
          </DefinitionList>
        </DetailsCard>

        <SideColumn>
          <DetailsCard>
            <SectionTitle>Ownership</SectionTitle>
            <SingleColumnDefinitionList>
              <DetailItem>
                <span className="name">Logbook</span>
                <span className="value">{car.details.ownership.logbook}</span>
              </DetailItem>
              <DetailItem>
                <span className="name">Previous owners</span>
                <span className="value">{car.details.ownership.numberOfOwners}</span>
              </DetailItem>
              <DetailItem>
                <span className="name">Date of registration</span>
                <span className="value">{formatDate(car.details.ownership.dateOfRegistration)}</span>
              </DetailItem>
            </SingleColumnDefinitionList>
          </DetailsCard>

          <DetailsCard>
            <SectionTitle>Equipment</SectionTitle>
            <EquipmentList>{car.details.equipment.map(renderEquipment)}</EquipmentList>
          </DetailsCard>
        </SideColumn>
      </DetailsGrid>
    </Page>
  );
}

const Page = styled.main`
  gap: 24px;
  width: 100%;
  display: flex;
  padding: 32px;
  margin: 0 auto;
  max-width: 1200px;
  min-height: 100dvh;
  flex-direction: column;

  @media (max-width: 700px) {
    padding: 20px 16px;
  }
`;

const PageHeader = styled.header`
  gap: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: var(--color-blue);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline-offset: 4px;
    outline: 3px solid var(--color-blue);
  }
`;

const VehicleReference = styled.span`
  font-size: 14px;
  color: var(--color-marrow);
`;

const Hero = styled.section`
  display: grid;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  background: var(--color-white);
  border-radius: var(--border-radius);
  grid-template-columns: 1.25fr 0.75fr;
  border: 1px solid var(--border-color);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Gallery = styled.div`
  position: relative;
  min-height: 420px;
  background: var(--color-gray);

  @media (max-width: 800px) {
    min-height: auto;
    aspect-ratio: 4 / 3;
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--default-padding);
`;

const VehicleType = styled.p`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-blue);
  text-transform: uppercase;
`;

const Title = styled.h1`
  color: #090a0d;
  margin-top: 8px;
  font-size: 44px;
  line-height: 1.1;
`;

const ModelMeta = styled.p`
  color: #696d73;
  font-size: 18px;
  margin-top: 8px;
`;

const Price = styled.p`
  font-size: 40px;
  color: #090a0d;
  font-weight: 700;
  margin-top: 30px;
`;

const PriceLabel = styled.p`
  font-size: 14px;
  color: #696d73;
`;

const QuickFacts = styled.div`
  gap: 16px;
  display: grid;
  margin-top: 28px;
  grid-template-columns: repeat(2, 1fr);

  > :last-child {
    grid-column: 1 / -1;
  }
`;

const QuickFact = styled.div`
  gap: 10px;
  min-width: 0;
  display: flex;
  align-items: center;
  color: var(--color-black);

  svg {
    width: 22px;
    flex-shrink: 0;
  }
`;

const AuctionStatus = styled.div`
  gap: 14px;
  display: flex;
  margin-top: auto;
  align-items: center;
  color: var(--color-blue);
  padding-top: var(--default-padding);
  border-top: 1px solid var(--border-color);

  > svg {
    width: 31px;
    height: 31px;
    flex-shrink: 0;
  }
`;

const AuctionLabel = styled.p`
  color: #696d73;
  font-size: 14px;
  font-weight: 500;
`;

const AuctionValue = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-black);
`;

const DetailsGrid = styled.div`
  gap: 24px;
  display: grid;
  align-items: start;
  grid-template-columns: 1.35fr 0.65fr;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const SideColumn = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const DetailsCard = styled.section`
  box-shadow: var(--box-shadow);
  background: var(--color-white);
  padding: var(--default-padding);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h2`
  color: #090a0d;
  font-size: 22px;
  padding-bottom: var(--default-padding);
  border-bottom: 1px solid var(--border-color);
`;

const DefinitionList = styled.dl`
  gap: 0 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const SingleColumnDefinitionList = styled(DefinitionList)`
  grid-template-columns: 1fr;
`;

const DetailItem = styled.div`
  gap: 6px;
  display: flex;
  padding: 16px 0;
  justify-content: space-between;
  border-bottom: 1px solid #dce2e8;

  .name {
    color: #696d73;
  }

  .value {
    font-weight: 600;
    text-align: right;
    color: var(--color-black);
  }
`;

const EquipmentList = styled.ul`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  list-style: none;
`;

const EquipmentItem = styled.li`
  font-size: 14px;
  padding: 8px 12px;
  color: var(--color-black);
  border: 1px solid #dce2e8;
  background: var(--color-gray);
  border-radius: var(--border-radius);
`;

const NotFoundCard = styled.section`
  gap: 16px;
  width: 100%;
  display: flex;
  margin: auto;
  max-width: 560px;
  padding: 48px 24px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  box-shadow: var(--box-shadow);
  background: var(--color-white);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);

  p {
    color: #696d73;
    line-height: 1.5;
  }
`;

const FavoriteButton = styled.button`
  top: clamp(8px, 2vw, 14px);
  border: 0;
  right: clamp(8px, 2vw, 14px);
  width: clamp(42px, 5vw, 52px);
  height: clamp(42px, 5vw, 52px);
  display: grid;
  cursor: pointer;
  color: var(--color-blue);
  position: absolute;
  place-items: center;
  border-radius: 8px;
  background: var(--color-white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
  transition:
    transform 150ms ease,
    background-color 150ms ease;

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline-offset: 2px;
    outline: 3px solid var(--color-blue);
  }
`;

export default Details;
