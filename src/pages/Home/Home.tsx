import styled from "styled-components";

import Box from "../../components/Box/Box";
import Select from "../../components/Select/Select";
import InputText from "../../components/InputText/InputText";
import InputNumber from "../../components/InputNumber/InputNumber";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import Pill from "../../components/Pill/Pill";

function Home() {
  const options = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "hamster", label: "Hamster" },
    { value: "parrot", label: "Parrot" },
    { value: "spider", label: "Spider" },
    { value: "goldfish", label: "Goldfish" },
  ];

  return (
    <Container>
      <FiltersContainer>
        <Box label="Filters">
          <Select options={options} placeholder="123" />

          <InputText placeholder="Model" />

          <InputNumber placeholder="Min bid" />

          <InputNumber placeholder="Max bid" />

          <Checkbox label="Only favorite" />

          <Button>Clear filters</Button>

          <Pill>ASDFGH</Pill>
        </Box>
      </FiltersContainer>
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

const FiltersContainer = styled.div`
  height: 50vh;
`;

export default Home;
