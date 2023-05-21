import { Noto_Sans_Thai } from 'next/font/google'
import { Container } from 'react-bootstrap'
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "@/components/language";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })
import Head from "next/head";


export default function Home() {
    const { language } = useLanguage();
    return (
        <>
            <Head>
                <title>{t("home.title", language)}</title>
                <meta name="description" content="Meta description for the Home page" />
            </Head>
            <div className={noto_sans_thai.className}>
                <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
                    <figure className="text-center pt-4 pb-4 text-light">
                        <blockquote className="blockquote">
                            <p className="display-4"> Prompt Lab</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            <h6> {t("home.description", language)} </h6>
                        </figcaption>
                    </figure>
                </Container>

                <Container fluid={true}>
                
                </Container>
            </div>
        </>
    )
}
