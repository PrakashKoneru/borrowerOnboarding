import React from 'react';
import '../styles/globals.css'
import { ChakraProvider, extendTheme, Container } from "@chakra-ui/react"
import { StateMachineProvider, createStore } from "little-state-machine";
import theme from '../styles/theme';

const themeHelper = extendTheme({ ...theme })
export const ThemeContext = React.createContext(themeHelper);

createStore({
  data: {}
});

function MyApp({ Component, pageProps }) {
  return (
    <StateMachineProvider>
      <ChakraProvider theme={themeHelper}>
        <ThemeContext.Provider value={themeHelper}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </ChakraProvider>
    </StateMachineProvider>
  )
}

export default MyApp;
