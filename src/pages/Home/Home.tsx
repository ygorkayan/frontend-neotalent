import styled from "styled-components";

import Select from "../../components/Select/Select";
import InputText from "../../components/InputText/InputText";
import InputNumber from "../../components/InputNumber/InputNumber";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import Pill from "../../components/Pill/Pill";

import Card from "../../components/Card/Card";

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
        <Select options={options} placeholder="Make" />

        <InputText placeholder="Model" />

        <BidContainer>
          <InputNumber placeholder="Min bid" />

          <InputNumber placeholder="Max bid" />
        </BidContainer>

        <Checkbox label="Only favorite" />

        <ButtonContainer>
          <Button>Clear filters</Button>
        </ButtonContainer>

        <Pill>ASDFGH</Pill>
      </FiltersContainer>

      <Card />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  gap: 32px;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
`;

const BidContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const FiltersContainer = styled.div`
  gap: 16px;
  width: 40vh;
  display: flex;
  flex-direction: column;
`;

export default Home;
