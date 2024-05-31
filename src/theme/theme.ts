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

export const lightTheme = {
  colors: {
    bg: "#fff",
    text: "#000",
    excel: "#009879",
    taskbar: "#a2d2ff",
    desktop: "#bde0fe",
    gradient1: "#4f9bec",
    gradient2: "#518fe0",
    gradient3: "#5282d3",
    gradient4: "#5476c6",
    gradient5: "#546ab9",
    iconColor: "#1f2124",
    iconHover: "#105bcc",
    window: {
      header: "#e2e0e0",
    },
  },
  fonts: ["Roboto", "sans-serif"],
  fontSizes,
  fontWeights,
  taskbarHeight: "40px",
};

export const darkTheme = {
  colors: {
    bg: "#121212",
    text: "#b5aeae",
    excel: "#444242;",
    taskbar: "#003049",
    desktop: "#14213d",
    gradient1: "#27292a",
    gradient2: "#242527",
    gradient3: "#212224",
    gradient4: "#1e1e20",
    gradient5: "#1b1b1d",
    iconColor: "#e8eaed",
    iconHover: "#1f1f1f",
    window: {
      header: "#e2e0e0",
    },
  },
  fonts: ["Roboto", "sans-serif"],
  fontSizes,
  fontWeights,
  taskbarHeight: "40px",
};
