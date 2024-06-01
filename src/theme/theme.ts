const fontSizes = {
  normal: ".8rem",
  small: ".6rem",
  medium: "1rem",
  large: "1.5rem",
  xlarge: "3rem",
};

const fontWeights = {
  light: 100,
  normal: 300,
  bold: 600,
};

const window = {
  windowHeaderHeight: "25",
  windowFooterHeight: "25",
  borderRadius: "10",
};

export const lightTheme = {
  colors: {
    bg: "#fff",
    text: "#000",
    taskbar: "#a2d2ff",
    desktop: "#bde0fe",
    gradient1: "#4f9bec",
    gradient2: "#518fe0",
    gradient3: "#5282d3",
    gradient4: "#5476c6",
    gradient5: "#546ab9",
    iconColor: "#1f2124",
    iconHover: "#105bcc",
    table: {
      excel: "#009879",
      oddRows: "#f3f3f3",
      evenRows: "#fff",
      rowBottomLineColor: "1px solid lightgray",
      thText: "#fff",
      hoverBackgroundColor: "#009879",
      hoverTextColor: "#ffffff",
    },
    window: {
      header: "#e2e0e0",
    },
  },
  fonts: ["Roboto", "sans-serif"],
  fontSizes,
  fontWeights,
  taskbarHeight: "40px",
  transition: "all .3s ease-out",
  window,
};

export const darkTheme = {
  colors: {
    bg: "#121212",
    text: "#b5aeae",

    taskbar: "#003049",
    desktop: "#14213d",
    gradient1: "#27292a",
    gradient2: "#242527",
    gradient3: "#212224",
    gradient4: "#1e1e20",
    gradient5: "#1b1b1d",
    iconColor: "#e8eaed",
    iconHover: "#1f1f1f",
    table: {
      excel: "#444242",
      oddRows: "#7c7272",
      evenRows: "#7c7272",
      rowBottomLineColor: "1px solid lightgray",
      thText: "#fff",
      hoverBackgroundColor: "#575353",
      hoverTextColor: "#000000",
    },
    window: {
      header: "#e2e0e0",
    },
  },
  fonts: ["Roboto", "sans-serif"],
  fontSizes,
  fontWeights,
  taskbarHeight: "40px",
  transition: "all .3s ease-out",
  windowHeaderHeight: "25",
  windowFooterHeight: "25",
  window,
};
