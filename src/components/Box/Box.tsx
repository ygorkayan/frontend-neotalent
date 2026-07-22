import styled from "styled-components";

interface BoxProps {
  label?: string;
  children: React.ReactNode;
}

function Box(props: Readonly<BoxProps>) {
  return (
    <Container>
      {props.label && <Label>{props.label}</Label>}
      <BoxComponent>{props.children}</BoxComponent>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Label = styled.p`
  font-size: 18px;
  margin-left: 5px;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const BoxComponent = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow);
  padding: var(--default-padding);
  border-radius: var(--border-radius);
  background-color: var(--color-white);
`;

export default Box;
