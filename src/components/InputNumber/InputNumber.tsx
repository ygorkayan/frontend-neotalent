import { useId } from "react";
import styled from "styled-components";

function InputNumber(props: Readonly<InputNumberProps>) {
  const id = useId();

  return (
    <Container>
      <InputNumberComponent type="number" id={id} placeholder={props.placeholder} />
    </Container>
  );
}

interface InputNumberProps {
  placeholder?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputNumberComponent = styled.input`
  font-size: 16px;
  cursor: pointer;
  padding: var(--small-padding);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

export default InputNumber;
