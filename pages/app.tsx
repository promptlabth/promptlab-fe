import React from 'react'
import Footer from '@/components/footer/Footer'
import AppTabbar from '@/components/tabbar/tabbar'
import { Noto_Sans_Thai } from 'next/font/google'
import { MaintainPage } from '@/components/maintain'
import { useUserContext } from '@/contexts/UserContext'
import NavbarMobileAfterLogin from '@/components/navbar/NavbarMobileAfterLogin'
import NavbarMobile from '@/components/navbar/NavbarMobile'

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

export default function PromptLabApp({ Component, pageProps }: any) {
   const userContext = useUserContext()
   const isMaintain: boolean = false

   return (
      <div className={noto_sans_thai.className}>
         {isMaintain && <MaintainPage />}
         {userContext?.user?
            <NavbarMobileAfterLogin /> :
            <NavbarMobile />
         }
         <AppTabbar />
         <Component {...pageProps} />
         <Footer />
      </div>
   )
}
