import { useId } from "react";
import styled from "styled-components";

function InputText(props: Readonly<InputTextProps>) {
  const id = useId();

  return (
    <Container>
      <InputTextComponent
        id={id}
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props?.onChange?.(e.target.value)}
      />
    </Container>
  );
}

interface InputTextProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const InputTextComponent = styled.input`
  width: 100%;
  min-width: 0;
  font-size: 16px;
  cursor: pointer;
  padding: var(--small-padding);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

export default InputText;
