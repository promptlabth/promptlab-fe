import Footer from '@/components/Footer';
import { AppNavbar } from '@/components/navbar/Navbar';
import { LanguageProvider } from '@/language/ LanguageContext';

import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import { Noto_Sans_Thai } from 'next/font/google'
import Script from 'next/script';

import { ReactElement, ReactNode } from 'react';

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['latin'] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
        <main className={noto_sans_thai.className}>

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
            <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossOrigin="anonymous"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.min.js" integrity="sha384-heAjqF+bCxXpCWLa6Zhcp4fu20XoNIA98ecBC1YkdXhszjoejr5y9Q77hIrv8R9i" crossOrigin="anonymous"></Script>
            {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap" rel="stylesheet" /> */}
            <LanguageProvider>
                <AppNavbar />
                <Component {...pageProps} />
                <Footer />
            </LanguageProvider>
        </main>
    )

    // return getLayout(<Component {...pageProps} />)

}
