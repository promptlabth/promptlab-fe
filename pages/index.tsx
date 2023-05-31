import { Noto_Sans_Thai } from 'next/font/google'
import { Container } from 'react-bootstrap'
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "@/components/language";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })
import Head from "next/head";
import styles from "./styles.module.css";
import Link from 'next/link';


const TikTokVideo = () => (
   <div
     dangerouslySetInnerHTML={{
       __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@coderbizz/video/7217780564261129499" data-video-id="7217780564261129499"> <section> <a target="_blank" title="@coderbizz" href="https://www.tiktok.com/@coderbizz?refer=embed">@coderbizz</a> เขียนแคปชั่นสำหรับขายของได้อย่างรวดเร็วได้แล้ววันนี้ <a title="programming" target="_blank" href="https://www.tiktok.com/tag/programming?refer=embed">#programming</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> <a title="โปรแกรมเมอร์" target="_blank" href="https://www.tiktok.com/tag/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%81%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%A1%E0%B8%AD%E0%B8%A3%E0%B9%8C?refer=embed">#โปรแกรมเมอร์</a> <a title="chatgpt" target="_blank" href="https://www.tiktok.com/tag/chatgpt?refer=embed">#chatGPT</a> <a title="ขายของออนไลน์" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B9%84%E0%B8%A5%E0%B8%99%E0%B9%8C?refer=embed">#ขายของออนไลน์</a> <a title="การตลาด" target="_blank" href="https://www.tiktok.com/tag/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%A5%E0%B8%B2%E0%B8%94?refer=embed">#การตลาด</a> <a target="_blank" title="♬ Funk Rave - Don´t Let Me Down 140 Bpm - kirtap" href="https://www.tiktok.com/music/Funk-Rave-Don´t-Let-Me-Down-140-Bpm-7092133950117677058?refer=embed">♬ Funk Rave - Don´t Let Me Down 140 Bpm - kirtap</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`,
     }}
   />
 );

export default function Home() {
   const { language } = useLanguage();
   const featureLinks: string[] = ["/createSellingPost", "/createIdeaContent", "/createArticle", "/createShortVideoScripts", "/createClickBaitWord"]
   const randomIndex = Math.floor(Math.random() * featureLinks.length);

   return (
      <>
         <Head>
            <title>{t("home.title", language)}</title>
            <meta
               name="description"
               content="Meta description for the Home page"
            />
         </Head>
         <div className={noto_sans_thai.className}>
            <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
               <figure className="text-center pt-4 pb-4 text-light">
                  <blockquote className="blockquote">
                     <p className="display-4"> Prompt Lab</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                     <h6> {t("home.description", language)} </h6>
                  </figcaption>

                  <Link href={featureLinks[randomIndex]}>
                     <button className={`${styles.btn} mt-3`}>JOIN NOW</button>
                  </Link>
               </figure>
               <Container className={`bg-dark ${styles.container}`}>
                  <Container className={`${styles.gray} ${styles.container}`}>
                     <figure className="text-center pt-4 pb-1 text-light">
                        <h3>
                           <b> {t("home.what_promptlab_look_like", language)}</b>
                        </h3>
                     </figure>

                     <TikTokVideo />
                     <div className={`row mb-2`}>
                        <div
                           className={`col-sm-4 mb-3 col-lg-5 ${styles.marginleft}`}
                        >
                           <img
                              className={`${styles.rounded} float-start img-fluid`}
                              src="https://cdn.pixabay.com/photo/2018/06/10/13/41/rice-terraces-3466518_640.jpg"
                           ></img>
                        </div>

                        <div className="col-sm-8 col-lg-5">
                           <figure className="text-start pt-2 pb-2 text-light">
                              <h4 className="mb-4">
                                 <b> {t("home.what_is_promptlab.title", language)}</b>
                              </h4>
                              <p> {t("home.what_is_promptlab.description", language)} </p>
                           </figure>
                        </div>
                     </div>
                     <div className={`row ${styles.margintop}`}>
                        <div className="col-sm-4 order-lg-2 mb-4 col-lg-5">
                           <img
                              className={`${styles.rounded} float-end img-fluid`}
                              src="https://cdn.pixabay.com/photo/2021/07/05/15/18/senbon-torii-6389421_640.jpg"
                           ></img>
                        </div>
                        <div
                           className={`col-sm-8 order-lg-1 col-lg-6 ${styles.marginright}`}
                        >
                           <figure className="text-start text-light">
                              <h4 className="mb-4">
                                 <b> {t("home.unlock_your_cretivity.title", language)} </b>
                              </h4>
                              <p> {t("home.unlock_your_cretivity.description", language)}</p>
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
