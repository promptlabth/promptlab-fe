import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import { Noto_Sans_Thai } from 'next/font/google'
import Head from 'next/head';
import Script from 'next/script';
import { ReactElement, ReactNode, useEffect, useState, } from 'react';
import { UserContextProvider } from '@/contexts/UserContext';
import { MaintainPage } from '@/components/maintain';
import NavbarMobileAfterLogin from '@/components/navbar/NavbarMobileAfterLogin';
import NavbarMobile from '@/components/navbar/NavbarMobile';
import AppTabbar from '@/components/tabbar/tabbar';
import Footer from '@/components/footer/Footer';
import { GetAccessToken } from '@/api/auth/auth_get_token';
import FbPostGeneratedComponent from '@/components/FbPostGeneratedComponent';
import { appWithTranslation } from 'next-i18next'
import { TextProvider } from '@/contexts/WiseSightContext';

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
   getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppProps) {
   const isMaintain: boolean = false
   // const getLayout = Component.getLayout ?? ((page) => page)
   const [token, setToken] = useState<string>("")

   const checkToken = async () => {
      const token = await GetAccessToken();
      if (token) {
         setToken(token);
      }
   }
   useEffect(() => {
      checkToken()
   }, [])
   return (
      <main className={noto_sans_thai.className}>
         <Script
            id="gtag-id"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=G-958P0ZZK61`}
         />

         <Script id="gtag-id-engine" strategy="lazyOnload">
            {`	
            window.dataLayer = window.dataLayer || [];
            function gtag(){
               dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-958P0ZZK61', {
               page_path: window.location.pathname,
            });
         `}
         </Script>
         <Script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "lxsllpw7xs");
</Script>
         <Script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
            integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
            crossOrigin="anonymous"
         ></Script>
         <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.min.js"
            integrity="sha384-heAjqF+bCxXpCWLa6Zhcp4fu20XoNIA98ecBC1YkdXhszjoejr5y9Q77hIrv8R9i"
            crossOrigin="anonymous"
         ></Script>
         {/* <Script id="snow" defer src="https://app.embed.im/snow.js">
         </Script> */}
         {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap" rel="stylesheet" /> */}
         <Head>
            <meta
               name="description"
               content="Prompt Lab is an AI-powered content generation tool that helps you create engaging social media posts, emails, and more in English and Thai. Boost your content creation with Prompt Lab today! - เป็นเครื่องมือสร้างเนื้อหาที่ขับเคลื่อนด้วย AI ซึ่งช่วยคุณสร้างโพสต์สื่อสังคม, อีเมล, และอื่น ๆ ที่น่าสนใจในภาษาอังกฤษและภาษาไทย ปรับปรุงการสร้างเนื้อหาของคุณด้วย Prompt Lab ในวันนี้!"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="facebook-domain-verification" content="d4husgwxjchsi7s2b1ib9p64xavzn6" />
            <link rel='icon' href='/images/prompt_lab_logo.png' />
            {/* Google Tag Manager - Global site tag (gtag.js) */}
            <script
               async
               src="https://www.googletagmanager.com/gtag/js?id=AW-16465071173"
            ></script>
            <script
               dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'AW-16465071173');
              `,
               }}
            />
         </Head>
         <UserContextProvider>
            {isMaintain && <MaintainPage />}
            {token ?
               <NavbarMobileAfterLogin /> :
               <NavbarMobile />
            }
            <AppTabbar />
            {/* <FbPostGeneratedComponent /> */}
            <TextProvider>
            <Component {...pageProps} />
            <Footer />
            </TextProvider>
         </UserContextProvider>
      </main>
   );
}

export default appWithTranslation(App)
