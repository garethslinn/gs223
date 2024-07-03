import React from 'react';
import { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Flexera Test - a challenge set by Flexera</title>
                <meta name="description" content="This is a test set by Flexera" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
            </Head>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default MyApp;
