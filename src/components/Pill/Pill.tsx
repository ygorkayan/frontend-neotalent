import styled from "styled-components";

interface PillProps {
  children: React.ReactNode;
}

function Pill(props: Readonly<PillProps>) {
  return (
    <PillComponent>
      {props.children}

      <RemoveButton>×</RemoveButton>
    </PillComponent>
  );
}

const RemoveButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-left: 8px;
  background-color: transparent;
`;

const PillComponent = styled.div`
  display: flex;
  font-size: 16px;
  border-radius: 32px;
  align-items: center;
  padding: var(--small-padding);
  justify-content: space-between;
  background-color: var(--color-white);
  border: 1px solid var(--border-color);
`;

export default Pill;
