import { useId } from "react";
import styled from "styled-components";

function InputText(props: Readonly<InputTextProps>) {
  const id = useId();

  return (
    <Container>
      <InputTextComponent type="text" id={id} placeholder={props.placeholder} />
    </Container>
  );
}

interface InputTextProps {
  placeholder?: string;
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
