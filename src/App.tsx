import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { lightTheme, darkTheme } from "./theme/theme";
import styled, { ThemeProvider } from "styled-components";
import Taskbar from "./components/Taskbar/Taskbar";
import Mode from "./components/Sidebars/Mode";
import Wrapper from "./Wrapper";
// import { layout } from "./layout";
import Components from "./components/Components";
import AppIcon from "./components/Taskbar/icons/AppIcon";
import TreeIcon from "./components/Taskbar/icons/TreeIcon";
import PivotIcon from "./components/Taskbar/icons/PivotIcon";
import CalculatorIcon from "./components/Taskbar/icons/CalcIcon";
import ChartIcon from "./components/Taskbar/icons/ChartIcon";
import GridIcon from "./components/Taskbar/icons/GridIcon";
import BarChartIcon from "./components/Taskbar/icons/BarChartIcon";

const Div = styled.div`
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.colors.gradient1},
    ${(props) => props.theme.colors.gradient2},
    ${(props) => props.theme.colors.gradient3},
    ${(props) => props.theme.colors.gradient4},
    ${(props) => props.theme.colors.gradient5}
  );
  color: ${(props) => props.theme.colors.text};
  min-height: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSizes.normal};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  display: grid;
  grid-template-rows: auto 1fr auto;
  transition-property: background-image;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100%;
`;

const App = () => {
  const [theme, setTheme] = useState("li");
  const { apps } = useSelector((state: RootState) => state.app);

  const isDarkTheme = theme === "dark";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Div>
        <Wrapper />
        <Mode onChange={onChange} />
        <Main>{apps.map((block) => Components(block))}</Main>
        <AppIcon />
        <TreeIcon />
        <PivotIcon />
        <CalculatorIcon />
        <ChartIcon />
        <Taskbar />
        <GridIcon />
        <BarChartIcon />
      </Div>
    </ThemeProvider>
  );
};

export default App;
