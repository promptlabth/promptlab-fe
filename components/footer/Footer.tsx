import Link from "next/link";
import Container from 'react-bootstrap/Container';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "../../languages/language";
import { useEffect, useState } from "react";
import { urlLinks } from "../../constant";
import { useRouter } from 'next/router';
import { Carousel} from "react-bootstrap";
import { AiOutlineMessage } from 'react-icons/ai';
import styles from "../footer/styles.module.css";
import { Noto_Sans_Thai } from 'next/font/google'
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

const Footer = () => {
    const { language } = useLanguage();
    const [titles, setTitles] = useState(
        urlLinks.map(({ titleKey }) => translate(titleKey, language))
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

    const SponsorCarousel = () => {
        return (
            <>
                <Carousel style={{ cursor: "pointer" }} >
                    <Carousel.Item onClick={handleClickPermlikejj} interval={5000}>
                        <img
                            className="d-block w-100 h-100"
                            src="/images/promote_permlikejj.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item onClick={handleClickPMost} interval={4000}>
                        <img
                            className="d-block w-100"
                            src="/images/promote_mostV2.png"
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
        setTitles(urlLinks.map(({ titleKey }) => translate(titleKey, language)));
    }, [language]);
    return (
        <footer className={noto_sans_thai.className}>
            <Container fluid={true} className={styles.footer}>
                <Container className={styles.footer_container}>
                    <hr className={styles.footer_divider} />
                    <div className="row d-flex justify-content-sm-evenly">
                        <div className="col-lg-4">
                            <h5 className={styles.footer_header}>{translate("footer.sponsors", language)}</h5>
                            <hr className={styles.footer_header_div} />
                            <SponsorCarousel />
                            <div className="p-2 justify-content-center d-flex">
                                <button className={styles.footer_contact_us_btn} onClick={handleClickConnect} >
                                    <AiOutlineMessage className="fs-5" />
                                    <text className="ps-2">
                                        {language === "th" && "สนใจติดต่อเรา"}
                                        {language === "eng" && "Contact us"}
                                    </text>
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4 pb-3">
                            <h5 className={styles.footer_header}>{translate("footer.links", language)}</h5>
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
                            {translate("footer.aboutUs", language)}
                        </div>
                        <div className={styles.footer_vertical_div} />
                        <div className={styles.footer_link_disable}>
                            {translate("footer.joinUs", language)}
                        </div>
                        <div className={styles.footer_vertical_div} />

                        <Link href={"/privacy-policy"} className="nav-link text-dark">
                            <div className={styles.footer_link}>
                                {translate("footer.privacy_policy", language)}
                            </div>
                        </Link>

                        <div className={styles.footer_vertical_div} />
                        <Link href={"/help"} className="nav-link">
                            <div className={styles.footer_link}>
                                {translate("footer.help", language)}
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
