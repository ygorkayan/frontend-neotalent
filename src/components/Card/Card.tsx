import styled from "styled-components";
import { CalendarIcon, FuelIcon, RoadIcon, TimerIcon, FavoriteIcon } from "./Icons";
import { useCountdown, formatPrice } from "./Util";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  auctionStartsAt: string;
  startingBid: number;
  make: string;
  model: string;
  engineSize: string;
  fuelType: string;
  year: number;
  mileage: number;
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

function Card({
  id,
  auctionStartsAt,
  startingBid,
  make,
  model,
  engineSize,
  year,
  fuelType,
  mileage,
  isFavorite,
  onFavoriteClick,
}: Readonly<CardProps>) {
  const navigate = useNavigate();
  const { remainingDays, remainingHours, auctionHasStarted, date } = useCountdown(auctionStartsAt);

  return (
    <CardContainer onClick={() => navigate(`/vehicle/${id}`)}>
      <Gallery>
        <CarImage src="/images/car-placeholder.png" alt="car image" />

        <FavoriteButton
          type="button"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
        >
          <FavoriteIcon $filled={isFavorite} />
        </FavoriteButton>
      </Gallery>

      <Content>
        <Price>{formatPrice(startingBid)}</Price>
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
  width: 100%;
  min-width: 0;
  cursor: pointer;
  box-shadow: var(--box-shadow);
  background: var(--color-white);
  padding: clamp(14px, 2vw, var(--default-padding));
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

const Content = styled.div`
  padding-top: clamp(20px, 3vw, 30px);
`;

const Price = styled.p`
  color: #090a0d;
  font-size: clamp(28px, 3vw, 34px);
  font-weight: 700;
  line-height: 1.1;
`;

const Name = styled.span`
  display: block;
  margin-top: clamp(20px, 3vw, 30px);
  overflow: hidden;
  color: #090a0d;
  font-size: clamp(21px, 2.5vw, 26px);
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
  gap: 17px clamp(14px, 2vw, 28px);
  margin-top: clamp(22px, 3vw, 30px);
  grid-template-columns: repeat(2, minmax(0, 1fr));

  > :last-child {
    grid-column: 1 / -1;
  }
`;

const Detail = styled.div`
  gap: 10px;
  min-width: 0;
  display: flex;
  font-size: clamp(16px, 2vw, 20px);
  color: #111216;
  align-items: center;

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }
`;

const AuctionCountdown = styled.div`
  gap: 13px;
  display: flex;
  margin-top: clamp(22px, 3vw, 28px);
  color: var(--color-blue);
  padding-top: clamp(18px, 2.5vw, 22px);
  align-items: center;
  border-top: 1px solid var(--border-color);

  > svg {
    width: 31px;
    height: 31px;
  }
`;

const AuctionTime = styled.div`
  gap: 2px;
  min-width: 0;
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
  font-size: clamp(16px, 2vw, 18px);

  strong {
    color: var(--color-blue);
    font-size: clamp(19px, 2.2vw, 22px);
  }
`;

export default Card;
