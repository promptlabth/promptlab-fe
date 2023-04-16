import Link from "next/link";
import Container from 'react-bootstrap/Container';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from "./language";
import { useEffect, useState } from "react";
import { urlLinks } from "./navbar/constant";
import { useRouter } from 'next/router';
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { AiOutlineMessage } from 'react-icons/ai';

/**
 * Footer using Bootstrap 5
 */
const Footer = () => {
    const { language } = useLanguage();
    const [titles, setTitles] = useState(
        urlLinks.map(({ titleKey }) => t(titleKey, language))
    );
    const router = useRouter()

    const handleClickConnect = () => {
        router.push('https://line.me/ti/p/6U8C67P6q1');
      };

    const handleClickPJean = () => {
        router.push('https://www.facebook.com/lasxna');
      };

    const SponsorCarousel = () => {
        return (
            <>
                <Carousel style={{cursor: "pointer"}} >
                    <Carousel.Item onClick={handleClickPJean}>
                        <img 
                            className="d-block w-100"
                            src="/images/promote_jean.png"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item onClick={handleClickConnect}>
                        <img
                            className="d-block w-100"
                            src="/images/promote_bg.png"
                            alt="Second slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item onClick={handleClickConnect}>
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
        setTitles(urlLinks.map(({ titleKey }) => t(titleKey, language)));
    }, [language]);
    return (
        <footer>
            <Container fluid className="p-4 pb-1" style={{ backgroundColor: "#6E6E6E" }}>
                <div className="row">
                    <div className="col-lg-4 p-3">
                        <h5 className="fs-4 fw-semibold"> PROMPT LAB</h5>
                        <hr className="m-0 mb-2 bg-white " style={{ height: "2px" }} />

                        <div>
                            <p className="fs-5 container"> {t("footer.description_1", language)} </p>
                            <p className="fs-5 container"> {t("footer.description_2", language)}</p>
                        </div>
                    </div>
                    <div className="col-lg-4 pt-3 pb-3">
                        <h5 className="fs-4 fw-semibold">{t("footer.links", language)}</h5>
                        <hr className="m-0 mb-2 bg-white" style={{ height: "2px" }} />

                        {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom"/> */}
                        <ul className="list-group">
                            {urlLinks.map(({ href }, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    className="fs-6 category-list text-decoration-none"
                                    style={{
                                        background: href === router.pathname ? "rgb(255, 255, 255,0.8)" : "",
                                        color: "black"
                                    }}
                                >
                                    {titles[index]}
                                </Link>
                            ))}
                        </ul>
                    </div>
                    {/* https://line.me/ti/p/6U8C67P6q1 */}
                    <div className="col-lg-4 pt-3">
                        <h5 className="fs-4 fw-semibold">{t("footer.sponsors", language)}</h5>
                        <hr className="m-0 mb-2 bg-white" style={{ height: "2px" }} />
                        <SponsorCarousel />
                        <div className="p-2 justify-content-center d-flex">
                            <div className="">
                                <Button size="lg" variant="outline-light" className="m-2" onClick={handleClickConnect} >
                                    <AiOutlineMessage className="fs-5" />
                                    <text className="ps-2">
                                        {language === "th" && "สนใจติดต่อเรา"}
                                        {language === "en" && "Contact us"}
                                    </text>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </Container >
            <Row fluid className="p-4 text-light d-flex justify-content-center" style={{ backgroundColor: "#373737" }}>
                <Col md={8} className="text-center">
                    Prompt Lab @2023 | Thanks to Bootstrap 5 to make <b>{" "}Prompt Lab{" "}</b> a wondeful website!!
                </Col>
            </Row>
        </footer>
    )
}
export default Footer;

