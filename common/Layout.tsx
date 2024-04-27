import { ReactNode } from "react";
import { Noto_Sans_Thai as NotoSanThai } from "next/font/google";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const notoSanThai = NotoSanThai({ weight: "400", subsets: ["thai"] });
interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageContent: string;
}

const Layout = (props: LayoutProps) => {
  const { t } = useTranslation();
  const { pageTitle, pageContent, children } = props;
  return (
    <div className={notoSanThai.className}>
      <Head>
        <title>{t(pageTitle)}</title>
        <meta name="description" content={pageContent} />
      </Head>
      {children}
    </div>
  )
}

export default Layout