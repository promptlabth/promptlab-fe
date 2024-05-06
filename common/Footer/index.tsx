import Link from "next/link";
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from "react";
import { urlLinks } from "@/constants/link.constant";
import { useRouter } from 'next/router';
import { Carousel} from "react-bootstrap";
import { AiOutlineMessage } from 'react-icons/ai';
import styles from "./Footer.module.css";
import { Noto_Sans_Thai } from 'next/font/google'
import { useTranslation } from "next-i18next";

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

const Footer = () => {
    const { t, i18n } = useTranslation();
    const [titles, setTitles] = useState(
        urlLinks.map(({ titleKey }) => t(titleKey))
    );
    const router = useRouter()

    const handleClickConnect = () => {
        router.push('https://lin.ee/4EpU6b6');
    };

    const handleClickPJean = () => {
        router.push('https://www.facebook.com/lasxna');
    };

    const handleClickPermlikejj = () => {
        router.push('https://lin.ee/htsNQqk');
    };


    const handleClickPMost = () => {
        router.push('https://line.me/R/ti/p/@703vxfsh');
    }

    const handleClickLotto = () => {
        router.push('https://xn--12c9dcjit1d.com/register?invite=s15ec')
    }

    const handleClickJJ = () => {
        router.push('https://lin.ee/htsNQqk')
    }

    const SponsorCarousel = () => {
        return (
            <>
                <Carousel style={{ cursor: "pointer" }} >
                    <Carousel.Item onClick={handleClickJJ} interval={4000}>
                        <img
                            className="d-block w-100"
                            src="/images/promote_jj_shop.jpg"
                            alt="Second slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item onClick={handleClickConnect} interval={3000}>
                        <img
                            className="d-block w-100"
                            src="/images/promote_bg.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </>
        )
    }

    useEffect(() => {
        setTitles(urlLinks.map(({ titleKey }) => t(titleKey)));
    }, [i18n.language]);
    return (
        <footer className={noto_sans_thai.className}>
            {/* <Wisesight /> */}
            <Container fluid={true} className={styles.footer}>
                <Container className={styles.footer_container}>
                    <hr className={styles.footer_divider} />
                    <div className="row d-flex justify-content-sm-evenly">
                        <div className="col-lg-4">
                            <div className="p-2 justify-content-center d-flex">
                                <button className={styles.footer_contact_us_btn} onClick={handleClickConnect} >
                                    <AiOutlineMessage className="fs-5" />
                                    <text className="ps-2">
                                        {t("footer.contact_us")}
                                    </text>
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4 pb-3">
                            <h5 className={styles.footer_header}>{t("footer.links")}</h5>
                            <hr className={styles.footer_header_div} />
                            <ul className="list-group">
                                {urlLinks.map(({ href }, index) => (
                                    <Link
                                        key={index}
                                        href={href}
                                        className={styles.footer_prompt_service_link}
                                        style={{
                                            background: href === router.pathname ? "rgb(0, 255, 171,0.8)" : "",
                                            color: href === router.pathname ? "black" : "",
                                        }}
                                    >
                                        {titles[index]}
                                    </Link>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <Container fluid={true} className="p-3 d-flex justify-content-center">
                        <div className={styles.footer_link_disable}>
                            {t("footer.aboutUs")}
                        </div>
                        <div className={styles.footer_vertical_div} />
                        <div className={styles.footer_link_disable}>
                            {t("footer.joinUs")}
                        </div>
                        <div className={styles.footer_vertical_div} />

                        <Link href={"/privacy-policy"} className="nav-link text-dark">
                            <div className={styles.footer_link}>
                                {t("footer.privacy_policy")}
                            </div>
                        </Link>

                        <div className={styles.footer_vertical_div} />
                        <Link href={"/help"} className="nav-link">
                            <div className={styles.footer_link}>
                                {t("footer.help")}
                            </div>
                        </Link>
                        <div className={styles.footer_vertical_div} />

                    </Container>

                    <Container className={styles.footer_container}>
                        <hr className={styles.footer_lower_divider} />
                        <div className="d-flex justify-content-center">
                            <div className={styles.footer_copyright}>
                                @prompt.sutmeme.com
                            </div>
                        </div>
                    </Container>

                </Container>

            </Container>
        </footer>
    )
}
export default Footer;
