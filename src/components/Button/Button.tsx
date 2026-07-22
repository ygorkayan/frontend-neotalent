import styled from "styled-components";

function Button(props: Readonly<ButtonProps>) {
  return <ButtonComponent>{props.children}</ButtonComponent>;
}

interface ButtonProps {
  children?: React.ReactNode;
}

const ButtonComponent = styled.button`
  font-size: 16px;
  cursor: pointer;
  border-radius: var(--border-radius);
  background-color: var(--color-white);
  border: 1px solid var(--border-color);
  padding: var(--small-padding) var(--default-padding);

  &:active {
    transform: scale(0.99);
  }
`;

export default Button;
