import styled from "styled-components";
import { DownArrow } from "../../svgs";
import { useState, useRef, useEffect } from "react";

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  &select {
    display: block;
  }
  &select-selected {
    background-color: limegreen;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 8px;
  font-weight: bold;
  border-radius: 10px;
  margin: 5px 8px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Item = styled.div`
  padding: 5px 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.table.hoverBackgroundColor};
    color: ${(props) => props.theme.colors.table.hoverTextColor};
  }
  &.active {
    font-weight: bold;
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  right: 0;
  width: 100%;
  padding: 5px 3px;
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform-origin: top right;
  transform: scale(${(props) => (props.$isOpen ? 1 : 0)});
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s ease;
`;

export interface SelectProps {
  label: string;
  value: string;
}

interface Props {
  options: SelectProps[];
  placeholder: string;
  onChange: (s: SelectProps) => void;
}

function Select(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SelectProps>();
  const { options, placeholder, onChange } = props;

  const selectRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  });

  const handleWindowClick = (e: MouseEvent) => {
    if (selectRef.current && itemsRef.current) {
      if (
        !selectRef.current.contains(e.target as HTMLDivElement) &&
        !itemsRef.current.contains(e.target as HTMLDivElement)
      ) {
        setIsOpen(false);
      }
    }
  };

  const handleSelect = (o: SelectProps) => {
    setSelectedValue(o);
    setIsOpen(false);
    if (onChange) {
      onChange(o);
    }
  };

  return (
    <Wrapper ref={selectRef}>
      <div>
        <ButtonHolder
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <span>{selectedValue?.label ?? placeholder}</span>
          <DownArrow stroke={"#000000"} />
        </ButtonHolder>
      </div>

      <Dropdown $isOpen={isOpen} ref={itemsRef}>
        {options.map((o, i) => {
          return (
            <Item key={`option-${i}`} onClick={() => handleSelect(o)}>
              {o.label}
            </Item>
          );
        })}
      </Dropdown>
    </Wrapper>
  );
}

export default Select;
