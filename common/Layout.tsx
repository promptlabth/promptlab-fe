import { ReactNode } from "react";
import { Noto_Sans_Thai as NotoSanThai } from "next/font/google";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const notoSanThai = NotoSanThai({ weight: "400", subsets: ["thai"] });
interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageContent: string;
}

const Layout = (props: LayoutProps) => {
  const { t } = useTranslation();
  const translate = t;
  const { pageTitle, pageContent, children } = props;
  return (
    <div className={notoSanThai.className}>
      <Head>
        <title>{translate(pageTitle)}</title>
        <meta name="description" content={pageContent} />
      </Head>
      {children}
    </div>
  )
}

export default Layout