import { useId } from "react";
import styled from "styled-components";

function InputNumber(props: Readonly<InputNumberProps>) {
  const id = useId();

  return (
    <Container>
      <CheckboxComponent type="checkbox" id={id} name={props.label} value="Bike" />

      {props.label && <Label htmlFor={id}>{props.label}</Label>}
    </Container>
  );
}

interface InputNumberProps {
  label?: string;
}

const Container = styled.div`
  gap: 8px;
  display: flex;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 18px;
  text-transform: capitalize;
`;

const CheckboxComponent = styled.input`
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid red;
`;

export default InputNumber;
