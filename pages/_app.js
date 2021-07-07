import React from 'react';
import '../styles/globals.css'
import { ChakraProvider, extendTheme, Container } from "@chakra-ui/react"
import { StateMachineProvider, createStore } from "little-state-machine";
import theme from '../styles/theme';
import Header from './components/reUsable/header';
import Head from 'next/head'

const themeHelper = extendTheme({ ...theme })
export const ThemeContext = React.createContext(themeHelper);

createStore({
  data: {}
});

function MyApp({ Component, pageProps }) {
  return (
    <StateMachineProvider>
      <Head>
        <title>Paisa</title>
        <link rel="shortcut icon" href="/clockLogo4x.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider theme={themeHelper}>
        <ThemeContext.Provider value={themeHelper}>
          <Header h="75px"/>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </ChakraProvider>
    </StateMachineProvider>
  )
}

export default MyApp;
