import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import Script from 'next/script';

const roboto = Roboto({ weight: '400', subsets: ['latin'], })
export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={roboto.className}>

            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-958P0ZZK61`} />

            <Script strategy="lazyOnload">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-958P0ZZK61', {
        page_path: window.location.pathname,
        });
        `}
            </Script>
            <Component {...pageProps} />
        </main>
    )

}
