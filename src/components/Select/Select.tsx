import { useId } from "react";
import styled from "styled-components";

function Select(props: Readonly<SelectProps>) {
  const id = useId();

  const options = props.options?.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <Container>
      <SelectComponent id={id} defaultValue="" onChange={(e) => props?.onChange?.(e.target.value)}>
        <option value="" disabled>
          {props.placeholder}
        </option>

        {options}
      </SelectComponent>
    </Container>
  );
}

export type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps {
  options?: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const SelectComponent = styled.select`
  width: 100%;
  min-width: 0;
  font-size: 16px;
  cursor: pointer;
  padding: var(--small-padding);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);

  &:has(option:first-child:checked) {
    color: #757575;
  }
`;

export default Select;
