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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default Details;
