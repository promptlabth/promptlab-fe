import Link from "next/link";
import Container from 'react-bootstrap/Container';
import { useLanguage } from '@/language/ LanguageContext';
import { t } from "./language";
import { useEffect, useState } from "react";
import { urlLinks } from "./navbar/constant";

/**
 * Footer using Bootstrap 5
 */
const Footer = () => {
    const { language } = useLanguage();
    const [titles, setTitles] = useState(
        urlLinks.map(({ titleKey }) => t(titleKey, language))
    );

    useEffect(() => {
        setTitles(urlLinks.map(({ titleKey }) => t(titleKey, language)));
    }, [language]);
    return (
        <footer>
            <Container fluid className="p-3 bg-gradient" style={{ backgroundColor: "#5A5A5A" }}>
                <div className="row">
                    <div className="col p-4">
                        <div>
                            <h1 className="fw-bold">PROMPT LAB</h1>
                            <p className="fs-5 fw-semibold container"> {t("footer.description_1", language)} </p>
                            <p className="fs-5 fw-semibold container"> {t("footer.description_2", language)}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 pt-2">
                        <h5 className="fs-3 fw-semibold">{t("footer.feateres", language)}</h5>
                        <hr className="m-0 mb-2 bg-white" style={{height:"2px"}}/>

                        {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom"/> */}
                        <ul className="list-group">
                            {urlLinks.map(({ href }, index) => (
                                <Link key={index} href={href} className="fs-6 category-list text-decoration-none">
                                    {titles[index]}
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>

            </Container >
            <div className="container-fluid p-3 text-light d-flex justify-content-center" style={{ backgroundColor: "#373737" }}>
                <text className="text-light">
                    Thanks to Bootstrap 5 to make
                    <b>{" "}Prompt Lab{" "}</b>
                    a wondeful website!!
                </text>
            </div>
        </footer>
    )
}
export default Footer;

