import styled from "styled-components";

function FallBackMsg() {
  return (
    <Container role="status" aria-live="polite">
      <Icon aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 5 5" />
      </Icon>

      <Title>No vehicles found</Title>
      <Message>Try adjusting or clearing the filters to see more vehicles.</Message>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 280px;
  display: flex;
  padding: 32px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #696d73;
  background: var(--color-gray);
  border-radius: var(--border-radius);
  border: 1px dashed var(--border-color);
`;

const Icon = styled.svg`
  width: 52px;
  height: 52px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Title = styled.h2`
  color: #111216;
  font-size: 22px;
  margin-top: 18px;
`;

const Message = styled.p`
  max-width: 420px;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 8px;
`;

export default FallBackMsg;
