import Head from 'next/head';
import { AppProps } from 'next/app';
// Context
import { AetherContextManager } from 'aetherspace/context';

/* --- <AppLayout/> ---------------------------------------------------------------------------------- */

const AppLayout = (props: AppProps) => {
    // Props
    const { Component, pageProps } = props;
    const { pageTitle = 'example' } = pageProps;

    // -- Render --

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta key="title" name="title" content={pageTitle} />
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
                <meta
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                    name="viewport"
                />
            </Head>
            <AetherContextManager assets={{}} icons={{}} isNextJS>
                <Component {...pageProps} />
            </AetherContextManager>
        </>
    );
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AppLayout;
