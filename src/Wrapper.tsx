import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
  width: ${(props) => props.theme.scrollbar.width}px;
  transition: all .3s ease-out;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: ${(props) => props.theme.scrollbar.boxShadow};
  border-radius: ${(props) => props.theme.scrollbar.trackBorderRadius}px;
  transition: all .3s ease-out;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollbar.background};
  border-radius: ${(props) => props.theme.scrollbar.thumbBorderRadius}px;
  transition: all .3s ease-out;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${(props) => props.theme.scrollbar.backgroundHover}; 
}
`;

const Wrapper = () => {
  return <GlobalStyle />;
};

export default Wrapper;
