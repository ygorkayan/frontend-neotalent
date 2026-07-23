import type { ReactNode } from "react";
import styled from "styled-components";

interface IconProps {
  children: ReactNode;
  viewBox?: string;
}

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

const HeartIcon = styled.svg<{ $filled: boolean }>`
  width: 31px;
  height: 31px;
  fill: ${({ $filled }) => ($filled ? "currentColor" : "none")};
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: fill 150ms ease;
`;

function Icon({ children, viewBox = "0 0 24 24" }: Readonly<IconProps>) {
  return (
    <SvgIcon viewBox={viewBox} aria-hidden="true">
      {children}
    </SvgIcon>
  );
}

export function RoadIcon() {
  return (
    <Icon>
      <path d="m7 3-4 18M17 3l4 18M12 4v4m0 4v4m0 4v1" />
    </Icon>
  );
}

export function FuelIcon() {
  return (
    <Icon>
      <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17M4 21h12M7 7h6v5H7zM15 8h2l2 3v7a2 2 0 0 0 2 2V9l-2-2" />
    </Icon>
  );
}

export function CalendarIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </Icon>
  );
}

export function TimerIcon() {
  return (
    <Icon>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2M9 2h6M12 2v3M18.5 6.5 20 5" />
    </Icon>
  );
}

export function FavoriteIcon({ $filled }: Readonly<{ $filled: boolean }>) {
  return (
    <HeartIcon viewBox="0 0 24 24" $filled={$filled} aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </HeartIcon>
  );
}