import { useState } from "react";
import styled from "styled-components";
import { CalendarIcon, FuelIcon, RoadIcon, TimerIcon, FavoriteIcon } from "./Icons";
import { useCountdown } from "./Util";

interface CardProps {
  auctionStartsAt: string;
  startingBid: number;
  make: string;
  model: string;
  engineSize: string;
  fuelType: string;
  year: string;
  mileage: string;
  favorite: boolean;
}

function Card({
  auctionStartsAt,
  startingBid,
  make,
  model,
  engineSize,
  year,
  fuelType,
  mileage,
  favorite,
}: Readonly<CardProps>) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { remainingDays, remainingHours, auctionHasStarted, date } = useCountdown(auctionStartsAt);

  return (
    <CardContainer>
      <Gallery>
        <CarImage src="/images/mercedes-c300.png" alt="Mercedes-Benz C 300 prata visto de frente" />

        <FavoriteButton
          type="button"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={() => setIsFavorite((favorite) => !favorite)}
        >
          <FavoriteIcon $filled={isFavorite} />
        </FavoriteButton>
      </Gallery>

      <Content>
        <Price>
          <Currency>£</Currency> {startingBid}
        </Price>
        <Subtitle>Starting Bid</Subtitle>

        <Name>
          {make} {model}
        </Name>
        <Subtitle>
          {engineSize} - {year}
        </Subtitle>

        <DetailsList>
          <Detail>
            <RoadIcon />
            <span>{mileage}</span>
          </Detail>
          <Detail>
            <FuelIcon />
            <span>{fuelType}</span>
          </Detail>

          <Detail>
            <CalendarIcon />
            <span>{date}</span>
          </Detail>
        </DetailsList>

        <AuctionCountdown aria-live="polite">
          <TimerIcon />
          <AuctionTime>
            <AuctionLabel>{auctionHasStarted ? "Auction started" : "Auction starts in"}</AuctionLabel>
            {!auctionHasStarted && (
              <TimeValues>
                <strong>{remainingDays}</strong> days <strong>{remainingHours}</strong> hours
              </TimeValues>
            )}
          </AuctionTime>
        </AuctionCountdown>
      </Content>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 380px;
  cursor: pointer;
  box-shadow: var(--box-shadow);
  background: var(--color-white);
  padding: var(--default-padding);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

const Gallery = styled.div`
  overflow: hidden;
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--color-gray);
  border-radius: var(--border-radius);
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const FavoriteButton = styled.button`
  top: 14px;
  border: 0;
  right: 14px;
  width: 52px;
  height: 52px;
  display: grid;
  cursor: pointer;
  color: #0875c9;
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
    outline: 3px solid #0875c9;
  }
`;

const Content = styled.div`
  padding-top: 30px;
`;

const Price = styled.p`
  color: #090a0d;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.1;
`;

const Currency = styled.span`
  font-size: 32px;
  font-weight: 400;
`;

const Name = styled.span`
  display: block;
  margin-top: 30px;
  overflow: hidden;
  color: #090a0d;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.15;
  white-space: nowrap;
  text-decoration: none;
  text-overflow: ellipsis;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #696d73;
  line-height: 1.35;
`;

const DetailsList = styled.div`
  display: grid;
  gap: 17px 28px;
  margin-top: 30px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 390px) {
    grid-template-columns: 1fr;
  }
`;

const Detail = styled.div`
  gap: 10px;
  min-width: 0;
  display: flex;
  font-size: 20px;
  color: #111216;
  align-items: center;
  white-space: nowrap;
`;

const AuctionCountdown = styled.div`
  gap: 13px;
  display: flex;
  margin-top: 28px;
  color: #0875c9;
  padding-top: 22px;
  align-items: center;
  border-top: 1px solid var(--border-color);

  > svg {
    width: 31px;
    height: 31px;
  }
`;

const AuctionTime = styled.div`
  gap: 2px;
  display: flex;
  flex-direction: column;
`;

const AuctionLabel = styled.span`
  font-size: 14px;
  color: #696d73;
  font-weight: 500;
`;

const TimeValues = styled.span`
  color: #111216;
  font-size: 18px;

  strong {
    color: #0875c9;
    font-size: 22px;
  }
`;

export default Card;
