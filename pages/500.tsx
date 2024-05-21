import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import { FaQuestion } from "react-icons/fa";
import { GetStaticProps } from 'next'

const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });


const Error500Page = () => {
  return (
    <div className={notoSansThai.className}>
      <Head>
        <title> 500 - Website has issue</title>
        <meta name="description" content="404 - Page Not Found" />
      </Head>
      <div
        className="text-center bg-dark text-white d-flex align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <div>
          <div>
            <FaQuestion size={100} className="mb-5" />
          </div>
          <h3 className="fw-bold">Error, this website is having issue....</h3>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}


export default Error500Page;
