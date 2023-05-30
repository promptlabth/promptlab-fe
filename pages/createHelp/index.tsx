import { Container } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "@/components/language";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
const createHelp = () => {
    const { language } = useLanguage();
      return (
        <div className={noto_sans_thai.className}>
          <Head>
            <title>{t("home.title", language)}</title>
            <meta
              name="description"
              content="Meta description for the Home page"
            />
          </Head>
          <div className={noto_sans_thai.className}>
            <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
              <figure className="text-center pb-1 pt-3 text-light">
                <h2>
                  <b>มีอะไรให้เราช่วยไหม</b>
                </h2>
              </figure>
              <Container className={`bg-dark ${styles.container}`}>
                <Container className={`${styles.gray} p-4 ${styles.container}`}>
                  <div className={`row`}>
                    <figure className="text-start text-light">
                      <h4 className="mb-4">
                        <b>วิธีใช้ Prompt Lab</b>
                      </h4>
                      <ol className={`${styles.ol}`}>
                        <li>
                          <h5 className="mt-3">
                            <b>ใส่ข้อความ</b>
                          </h5>
                          <div>
                            ใส่ชื่อ, ข้อความหรือสิ่งที่ต้องการให้ Prompt Lab
                            สร้างให้ เช่น
                            <ul>
                              <li>แคปชั่นขายของ ใส่ชื่อสินค้า, ผลิตภัณฑ์</li>
                              <li>เขียนบทความ ใส่ชื่อหัวข้อที่สนใจ</li>
                              <li>
                                ช่วยคิดคอนเทนต์ ใส่หัวข้อคอนเทนต์ของผู้ใช้
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <h5 className="mt-4">
                            <b>เลือกสไตล์ของข้อความ</b>
                          </h5>
                          <p>
                            เลือกสไสล์ของข้อความที่ต้องการให้ Prompt Lab สร้าง
                            ได้แก่ สนุกสนาน, หรูหรา, มืออาชีพ, มีการศึกษา,
                            มั่นใจ, หรูหรา และย้อนยุค
                          </p>
                        </li>
                        <li>
                          <h5 className="mt-4">
                            <b>กด Generate และสนุกได้เลย!!</b>
                          </h5>
                          <div style={{ width: "100%" }}>
                            <video className="active w-100 mt-3" loop controls>
                              <source
                                src="https://mdbcdn.b-cdn.net/img/video/forest.mp4"
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

export default createHelp 