import styled from "styled-components";
import VerticalSwitch from "../Switches/VerticalSwitch";
import { DarkModeIcon, LightModeIcon } from "../../svgs";

const Div = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 100px;
  right: 0;
  height: 100px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  opacity: 0.8;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.bg};
  padding: 8px 12px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
`;

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Mode: React.FC<Props> = ({ onChange }) => {
  return (
    <Div>
      <LightModeIcon style={{ marginBottom: "10px" }} />
      <VerticalSwitch onChange={onChange} />
      <DarkModeIcon style={{ marginTop: "10px" }} />
    </Div>
  );
};

export default Mode;
