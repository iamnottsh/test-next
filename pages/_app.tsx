import type {AppProps} from 'next/app'
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {useMemo} from "react";

export default function App({Component, pageProps}: AppProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    )
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps} />
    </ThemeProvider>
}
