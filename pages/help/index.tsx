import { Col, Container, Row } from "react-bootstrap";
import Head from "next/head";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["latin"] });
import styles from "./styles.module.css";
import { MdEmail } from "react-icons/md";
import { FaLine } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
const Help = () => {
   const { t, i18n } = useTranslation();
   const router = useRouter()
   return (
      <div className={noto_sans_thai.className}>
         <Head>
            <title>{t("home.title")}</title>
            <meta
               name="description"
               content="Meta description for the Home page"
            />
         </Head>
         <div className={noto_sans_thai.className}>
            <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
               <figure className="text-center pb-1 pt-3 text-light">
                  <h2>
                     <b>{t("help.title")}</b>
                  </h2>
               </figure>
               <Container className={`bg-dark ${styles.container}`}>
                  <Container className={`${styles.gray} p-4 ${styles.container}`}>
                     <div className={`row`}>
                        <figure className="text-start text-light">
                           <h4 className="mb-2">
                              <b>
                                 {/* {language === "th" && "สนใจติดต่อเรา"}
                                 {language === "eng" && "Contact Us"}
                                 {language === "id" && "Hubungi kami"} */}
                              </b>
                           </h4>
                           <Row className="px-3 pb-4">
                              <div> {t("help.contact.description")} </div>
                              <Col sm className="pt-3 d-flex justify-content-center">
                                 <div className="">
                                    <div className="d-flex justify-content-center">
                                       <FaLine className="d-flex justify-content-center pt-2" size={80} />
                                    </div>
                                    <h4 className="fw-bold text-center"> LINE </h4>
                                    <button className={styles.contact_us_btn} onClick={() => {
                                       router.push('https://lin.ee/4EpU6b6');
                                    }}>
                                       <AiOutlineMessage className="fs-5" />
                                       <text className="ps-2">
                                          {t("footer.contact_us")}
                                       </text>
                                    </button>
                                 </div>
                              </Col>
                              <Col sm className="pt-3 d-flex justify-content-center">
                                 <div className="">
                                    <div className="d-flex justify-content-center">
                                       <MdEmail className="d-flex justify-content-center pt-2" size={80} />
                                    </div>
                                    <h4 className="fw-bold text-center"> EMAIL </h4>
                                    <div> isaman@promptlabai.com</div>
                                 </div>
                              </Col>
                           </Row>

                        </figure>
                        <figure className="text-start text-light">
                           <h4 className="mb-4">
                              <b>{t("help.howto.title")}</b>
                           </h4>
                           <ol className={`${styles.ol}`}>
                              <li>
                                 <h5 className="mt-3">
                                    <b>{t("help.howto.input.title")}</b>
                                 </h5>
                                 <div>
                                    {t("help.howto.input.description")}
                                    <ul>
                                       <li>{t("help.howto.input.example1")}</li>
                                       <li>{t("help.howto.input.example2")}</li>
                                       <li>{t("help.howto.input.example3")}</li>
                                    </ul>
                                 </div>
                              </li>
                              <li>
                                 <h5 className="mt-4">
                                    <b>{t("help.howto.select.title")}</b>
                                 </h5>
                                 <p>
                                    {t("help.howto.select.description")}
                                 </p>
                              </li>
                              <li>
                                 <h5 className="mt-4">
                                    <b>{t("help.howto.generate.title")}</b>
                                 </h5>
                                 <div style={{ width: "100%" }}>
                                    <video className="active w-100 mt-3" loop controls>
                                       <source
                                          src="https://drive.google.com/uc?export=download&id=1qen2OvJjWjLks7Feew8PiRob0lW4ubch"
                                          type="video/mp4"
                                       />
                                       Sorry, your browser doesn&apos;t support embedded
                                       videos.
                                    </video>
                                 </div>
                              </li>
                           </ol>
                        </figure>
                     </div>
                  </Container>
               </Container>
            </Container>
         </div>
      </div>
   );
}

export const getServerSideProps = async ({ locale }: any) => ({
   props: {
      ...(await serverSideTranslations(locale, ['common']))
   }
});



export default Help; 