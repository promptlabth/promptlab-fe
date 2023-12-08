import { Noto_Sans_Thai } from 'next/font/google'
import { Container } from 'react-bootstrap'
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/languages/language";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })
import Head from "next/head";
import styles from "./styles.module.css";
import Link from 'next/link';
import { TikTokEmbed } from 'react-social-media-embed';
import 'react-toastify/dist/ReactToastify.css';
import SubscriptionModal from '@/components/subscription';
import { useUserContext } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
   const userContext = useUserContext();
   const { language } = useLanguage();
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      // Check if the user has already seen the modal
      const modalShown = Cookies.get('modalShown');
      if (modalShown === undefined) {
         // If not, show the modal
         setShowModal(true);
      }
   }, []);

   return (
      <>
         <Head>
            <title>{translate("home.title", language)}</title>
            <meta
               name="description"
               content="Meta description for the Home page"
            />
         </Head>
         <div className={noto_sans_thai.className}>
            {( showModal) && <SubscriptionModal show={showModal} />}
            <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
               <figure className="text-center pt-4 pb-4 text-light">
                  <blockquote className="blockquote">
                     <p className="display-4"> Prompt Lab</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                     <h6> {translate("home.description", language)} </h6>
                  </figcaption>

                  <Link href="/subscription">
                     <button className={`${styles.btn} mt-3`}>JOIN NOW</button>
                  </Link>
               </figure>
               <Container className={`bg-dark ${styles.container}`}>
                  <Container className={`${styles.gray} ${styles.container}`}>
                     <figure className="text-center pt-4 pb-1 text-light">
                        <h3>
                           <b>
                              {" "}
                              {translate("home.what_promptlab_look_like", language)}
                           </b>
                        </h3>
                     </figure>

                     <div className="d-flex justify-content-center pb-4 mb-4">
                        <TikTokEmbed
                           url="https://www.tiktok.com/@coderbizz/video/7218015296366431514"
                           width={325}
                        />
                     </div>

                     <div className={`row mb-2`}>
                        <div className={`col-sm-4 mb-3 col-lg-5 ${styles.marginleft}`}>
                           <img
                              className={`${styles.rounded} float-start img-fluid`}
                              src="/images/prompt_lab_logo.png"
                              width={400}
                              height={300}
                              alt="PromptLabLogo"
                           ></img>
                        </div>

                        <div className="col-sm-8 col-lg-5">
                           <figure className="text-start pt-2 pb-2 text-light">
                              <h4 className="mb-4">
                                 <b>
                                    {" "}
                                    {translate("home.what_is_promptlab.title", language)}
                                 </b>
                              </h4>
                              <p>
                                 {" "}
                                 {translate(
                                    "home.what_is_promptlab.description",
                                    language
                                 )}{" "}
                              </p>
                           </figure>
                        </div>
                     </div>
                     <div className={`row ${styles.margintop}`}>
                        <div className="col-sm-4 order-lg-2 mb-4 col-lg-5">
                           <img
                              className={`${styles.rounded} float-end img-fluid`}
                              src="/images/prompt_gif.gif"
                              alt="promptlab_gif"
                           ></img>
                        </div>
                        <div
                           className={`col-sm-8 order-lg-1 col-lg-6 ${styles.marginright}`}
                        >
                           <figure className="text-start text-light">
                              <h4 className="mb-4">
                                 <b>
                                    {" "}
                                    {translate(
                                       "home.unlock_your_cretivity.title",
                                       language
                                    )}{" "}
                                 </b>
                              </h4>
                              <p>
                                 {" "}
                                 {translate(
                                    "home.unlock_your_cretivity.description",
                                    language
                                 )}
                              </p>
                           </figure>
                        </div>
                     </div>
                  </Container>
               </Container>
            </Container>
         </div>
      </>
   );
}
