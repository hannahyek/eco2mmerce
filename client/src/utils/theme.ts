import {
  extendTheme,
  withDefaultColorScheme,
  theme as base,
} from "@chakra-ui/react";
import type { CustomThemeTypings } from "@chakra-ui/react";

const colors: CustomThemeTypings = {
  primary: {
    50: "#fff4da",
    100: "#ffe0ae",
    200: "#ffcc7d",
    300: "#ffb84b",
    400: "#ffa31a",
    500: "#ff9900",
    600: "#b36b00",
    700: "#814d00",
    800: "#4f2d00",
    900: "#1f0d00",
  },
};

const components: CustomThemeTypings = {
  Container: {
    baseStyle: {
      maxW: "container.lg",
    },
  },
};

const fonts: CustomThemeTypings = {
  heading: `'Montserrat', ${base.fonts.heading}`,
  body: `'Montserrat', ${base.fonts.body}`,
};

const colorScheme = withDefaultColorScheme({ colorScheme: "primary" });

const theme = extendTheme({ colors, components, fonts }, colorScheme);

export default theme;
