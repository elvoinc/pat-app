import { extendTheme, theme as base } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `Luckiest Guy, ${base.fonts.heading}`,
    body: `Noto Sans, ${base.fonts.body}`,
  },
});

export default theme;
