import { useId } from "react";
import styled from "styled-components";

function Checkbox(props: Readonly<CheckboxProps>) {
  const id = useId();

  return (
    <Container>
      <CheckboxComponent
        id={id}
        type="checkbox"
        name={props.label}
        checked={props.value === "true"}
        onChange={(event) => props.onChange?.(event.target.checked)}
      />

      {props.label && <Label htmlFor={id}>{props.label}</Label>}
    </Container>
  );
}

interface CheckboxProps {
  label?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
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

export default Checkbox;
