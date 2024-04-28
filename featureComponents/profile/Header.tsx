import { TFunction } from "i18next";
import Head from "next/head";

export const Header = ({translate}: {translate: TFunction<"translation", undefined>}) => {
  return (
    <Head>
      <title>{translate("profile.title")}</title>
      <meta name="description" content="A generated messages history" />
    </Head>
  );
};
