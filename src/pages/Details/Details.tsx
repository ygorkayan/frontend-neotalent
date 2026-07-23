import styled from "styled-components";

function Details() {
  return (
    <Container>
      <h1>Details</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 16px;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Details;
