import { useId } from "react";
import styled from "styled-components";

function InputNumber(props: Readonly<InputNumberProps>) {
  const id = useId();

  return (
    <Container>
      <InputNumberComponent
        type="number"
        id={id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props?.onChange?.(e.target.value === "" ? null : Number(e.target.value))}
      />
    </Container>
  );
}

interface InputNumberProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: number | null) => void;
}

const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const InputNumberComponent = styled.input`
  width: 100%;
  min-width: 0;
  font-size: 16px;
  cursor: pointer;
  padding: var(--small-padding);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

export default InputNumber;
