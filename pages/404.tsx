import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
import { FaQuestion } from "react-icons/fa";

const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });

const Error404Page = () => {
  return (
    <div className={notoSansThai.className}>
      <Head>
        <title> 404 - Page Not Found</title>
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
          <h3 className="fw-bold">Error, this page is not found....</h3>
        </div>
      </div>
      {/* <div
        className="text-center bg-dark text-white d-flex align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <h3 className="fw-bold">Error, this page is not found....</h3>
      </div> */}
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Error404Page;
