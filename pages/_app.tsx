import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import Script from 'next/script';

import { ReactElement, ReactNode } from 'react';

const roboto = Roboto({ weight: '400', subsets: ['latin'], })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
        <main className={roboto.className}>

            <Script id='gtag-id' strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-958P0ZZK61`} />

            <Script id='gtag-id-engine' strategy="lazyOnload">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-958P0ZZK61', {
        page_path: window.location.pathname,
        });
        `}
            </Script>
            <Navbar/>
            <Component {...pageProps} />
            <Footer/>
        </main>
    )

    // return getLayout(<Component {...pageProps} />)

}
