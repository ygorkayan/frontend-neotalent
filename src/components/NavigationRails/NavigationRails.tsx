import { useEffect, useId, useState, type ReactNode } from "react";
import styled from "styled-components";

interface NavigationRailsProps {
  children: ReactNode;
  title?: string;
}

function NavigationRails({
  children,
  title = "Filters",
}: Readonly<NavigationRailsProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

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

      <RailPanel
        id={panelId}
        $open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!isOpen}
      >
        <RailHeader>
          <RailTitle id={titleId}>{title}</RailTitle>
          <CloseButton
            type="button"
            aria-label="Close filters"
            onClick={() => setIsOpen(false)}
          >
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
  position: fixed;
  z-index: 30;
  top: 50%;
  left: 0;
  width: 48px;
  height: 64px;
  border: 0;
  display: grid;
  cursor: pointer;
  color: var(--color-white);
  place-items: center;
  border-radius: 0 12px 12px 0;
  background: #0875c9;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  transform: translateY(-50%);

  &:focus-visible {
    outline: 3px solid #87c8fa;
    outline-offset: 3px;
  }
`;

const Overlay = styled.button<{ $open: boolean }>`
  position: fixed;
  z-index: 40;
  inset: 0;
  border: 0;
  width: 100%;
  height: 100%;
  cursor: default;
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  background: rgba(9, 10, 13, 0.46);
  transition:
    opacity 180ms ease,
    visibility 180ms ease;
`;

const RailPanel = styled.aside<{ $open: boolean }>`
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: min(84vw, 320px);
  height: 100dvh;
  padding: 22px;
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  background: var(--color-white);
  box-shadow: 8px 0 24px rgba(0, 0, 0, 0.18);
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition:
    transform 220ms ease,
    visibility 220ms ease;
`;

const RailHeader = styled.div`
  display: flex;
  padding-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d4d8dd;
`;

const RailTitle = styled.h2`
  color: #111216;
  font-size: 22px;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
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
  width: 27px;
  height: 27px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
`;

export default NavigationRails;
