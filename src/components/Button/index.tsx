import styled from "styled-components";

const Btn = styled.button<{
  $bgColor: string;
  $color: string;
  $hoverColor: string;
  $hoverText: string;
}>`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: ${(props) => props.$bgColor};
  border-radius: 8px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  border: none;
  outline: none;
  margin-right: 5px;
  cursor: pointer;
  color: ${(props) => props.$color};
  transition: all 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.$hoverColor};
    color: ${(props) => props.$hoverText};
  }
`;

type ButtonType = "normal" | "danger" | "warning" | "info";

interface Props {
  type: ButtonType;
  label: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  const { type, label, onClick } = props;

  let bgColor = "#0d6efd";
  let color = "#000000";
  let hoverColor = "#3081fa";
  let hoverText = "#000000";

  switch (type) {
    case "normal":
      bgColor = "#0d6efd";
      color = "#ffffff";
      hoverColor = "#3779dd";
      hoverText = "#ffffff";
      break;
    case "danger":
      bgColor = "#dc3545";
      color = "#ffffff";
      hoverColor = "#b42231";
      hoverText = "#ffffff";
      break;
    case "warning":
      bgColor = "#ffc107";
      color = "#000000";
      hoverColor = "#eec751";
      hoverText = "#000000";
      break;
    case "info":
      bgColor = "#0dcaf0";
      break;
    default:
      bgColor = "#009879";
      color = "#fff";
      break;
  }

  return (
    <Btn
      $bgColor={bgColor}
      $color={color}
      $hoverColor={hoverColor}
      $hoverText={hoverText}
      className="btn btn-primary"
      onClick={onClick}
    >
      {label}
    </Btn>
  );
};

export default Button;
