import type { ReactNode } from "react";
import styled from "styled-components";

function Card() {
  return (
    <CardContainer>
      <Gallery>
        <CarImage src="/images/mercedes-c300.png" alt="Mercedes-Benz C 300 prata visto de frente" />
      </Gallery>

      <Content>
        <Price>
          <Currency>£</Currency> 52 900
        </Price>
        <Subtitle>Starting Bid</Subtitle>

        <Name>Mercedes-Benz C 300 d AMG Line</Name>
        <Subtitle>1.6L</Subtitle>

        <DetailsList>
          <Detail>
            <RoadIcon />
            <span>11 000 mi</span>
          </Detail>
          <Detail>
            <FuelIcon />
            <span>Diesel</span>
          </Detail>

          <Detail>
            <CalendarIcon />
            <span>2024</span>
          </Detail>
        </DetailsList>
      </Content>
    </CardContainer>
  );
}

interface IconProps {
  children: ReactNode;
  viewBox?: string;
}

function Icon({ children, viewBox = "0 0 24 24" }: Readonly<IconProps>) {
  return (
    <SvgIcon viewBox={viewBox} aria-hidden="true">
      {children}
    </SvgIcon>
  );
}

function RoadIcon() {
  return (
    <Icon>
      <path d="m7 3-4 18M17 3l4 18M12 4v4m0 4v4m0 4v1" />
    </Icon>
  );
}

function FuelIcon() {
  return (
    <Icon>
      <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M4 21h12M7 7h6v5H7zM15 8h2l2 3v7a2 2 0 0 0 2 2V9l-2-2" />
    </Icon>
  );
}

function CalendarIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </Icon>
  );
}

const CardContainer = styled.div`
  cursor: pointer;
  width: min(100%, 430px);
  padding: 28px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--color-white);
  border: 1px solid #d4d8dd;
  box-shadow: var(--box-shadow);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 520px) {
    padding: 16px;
  }
`;

const Gallery = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 7px;
  background: var(--color-gray);
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
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
  font-size: 28px;
  font-weight: 700;
  line-height: 1.15;
  white-space: nowrap;
  text-decoration: none;
  text-overflow: ellipsis;
`;

const Subtitle = styled.p`
  color: #696d73;
  font-size: 16px;
  line-height: 1.35;
`;

const DetailsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 17px 28px;
  margin-top: 30px;

  @media (max-width: 390px) {
    grid-template-columns: 1fr;
  }
`;

const Detail = styled.div`
  display: flex;
  gap: 10px;
  min-width: 0;
  align-items: center;
  color: #111216;
  font-size: 20px;
  white-space: nowrap;
`;

const SvgIcon = styled.svg`
  width: 25px;
  height: 25px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export default Card;
