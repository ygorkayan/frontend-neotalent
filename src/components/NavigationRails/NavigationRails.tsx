import { useId, useState, type ReactNode } from "react";
import styled from "styled-components";

interface NavigationRailsProps {
  children: ReactNode;
  title?: string;
}

function NavigationRails({ children, title = "Filters" }: Readonly<NavigationRailsProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();

  return (
    <MobileNavigation>
      <RailButton
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label="Open filters"
        onClick={() => setIsOpen(true)}
      >
        <FilterIcon />
      </RailButton>

      <Overlay
        type="button"
        $open={isOpen}
        aria-label="Close filters"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
      />

      <RailPanel id={panelId} $open={isOpen} role="dialog" aria-modal="true" aria-hidden={!isOpen}>
        <RailHeader>
          <RailTitle id={titleId}>{title}</RailTitle>
          <CloseButton type="button" aria-label="Close filters" onClick={() => setIsOpen(false)}>
            <span aria-hidden="true">×</span>
          </CloseButton>
        </RailHeader>

        <RailContent>{children}</RailContent>
      </RailPanel>
    </MobileNavigation>
  );
}

function FilterIcon() {
  return (
    <Icon viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </Icon>
  );
}

const MobileNavigation = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const RailButton = styled.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  cursor: pointer;
  place-items: center;
  background: var(--color-white);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

const Overlay = styled.button<{ $open: boolean }>`
  z-index: 40;
  inset: 0;
  border: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  cursor: default;
  background: rgba(9, 10, 13, 0.46);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
`;

const RailPanel = styled.aside<{ $open: boolean }>`
  top: 0;
  left: 0;
  z-index: 50;
  padding: 22px;
  height: 100dvh;
  position: fixed;
  width: min(84vw, 320px);
  background: var(--color-white);
  box-shadow: 8px 0 24px rgba(0, 0, 0, 0.18);
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
`;

const RailHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #d4d8dd;
`;

const RailTitle = styled.h2`
  font-size: 22px;
  color: #111216;
`;

const CloseButton = styled.button`
  border: 0;
  width: 40px;
  height: 40px;
  display: grid;
  cursor: pointer;
  color: #111216;
  place-items: center;
  border-radius: 50%;
  background: transparent;

  span {
    font-size: 32px;
    line-height: 1;
  }

  &:hover {
    background: var(--color-gray);
  }

  &:focus-visible {
    outline: 3px solid #87c8fa;
  }
`;

const RailContent = styled.div`
  gap: 16px;
  display: flex;
  overflow-y: auto;
  padding-top: 24px;
  flex-direction: column;

  > * {
    flex-shrink: 0;
  }
`;

const Icon = styled.svg`
  fill: none;
  width: 27px;
  height: 27px;
  stroke-width: 2;
  stroke: currentColor;
  stroke-linecap: round;
`;

export default NavigationRails;
