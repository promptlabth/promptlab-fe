import Modal from 'react-bootstrap/Modal';
import { t } from "../language";
import { useLanguage } from "@/language/ LanguageContext";
import { Container } from 'react-bootstrap';
import { Noto_Sans_Thai } from 'next/font/google'
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['latin'] })

export const PageDescriptionModal = (props: any) => {
    const { language } = useLanguage();
    const learnMoreDescriptionTypeKey = 
        props.config.titlePage === "createSellingPost.title" ? "modal.description.inputMessage.createSellingPost" : 
        props.config.titlePage === "createEmail.title" ? "modal.description.inputMessage.createEmail" :
        props.config.titlePage === "createArticle.title" ? "modal.description.inputMessage.createArticle" :
        props.config.titlePage === "createScripts.title" ? "modal.description.inputMessage.createScripts" :
        props.config.titlePage === "createClickBait.title" ? "modal.description.inputMessage.createClickBait" :
        "modal.description.inputMessage.createSellingPost"

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={noto_sans_thai.className}
        >
            <Modal.Header closeButton>
                <Container fluid className="border justify-content-center d-flex">
                    <div className="p-2">
                        <Modal.Title className="fs-2 text">
                            <b>{t(props.config.titlePage, language)}</b>
                        </Modal.Title>
                    </div>
                </Container>
            </Modal.Header>
            <Modal.Body>
                <Container className="border p-0">
                    <div className="text-center fs-5">
                        <b>{t(props.config.titleDescription, language)}</b>
                    </div>
                </Container>

                <Container className="border mt-2 p-3">
                    <div className="fs-4"><b>{t("modal.title.howToUse", language)}</b></div>

                    <Container className="border">
                        <h4 className="pt-2">{t("modal.title.inputMessage", language)}</h4>
                        <div className="ps-4 pe-4">
                            <p>
                            {t(learnMoreDescriptionTypeKey,language)}
                            </p>
                        </div>
                    </Container>

                    <Container className="border">
                        <h4 className="pt-2">{t("modal.title.selectType", language)}</h4>
                        <div className="ps-4 pe-4">
                            <p> {t("modal.description.selectType",language)}</p>
                        </div>
                    </Container>

                    <Container>
                        <h4 className="pt-2">{t("modal.title.clickGenerate", language)}</h4>
                    </Container>

                </Container>

                {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas justo sed tincidunt malesuada.
                    Nullam efficitur, tortor sed suscipit laoreet, magna mi accumsan nunc, eget feugiat turpis velit quis massa.
                    Pellentesque pulvinar malesuada tortor ut pellentesque. Aenean porta nibh id condimentum congue.
                    Fusce laoreet lobortis sapien semper scelerisque. Sed eleifend magna in porttitor consequat.
                    Suspendisse faucibus purus et mi porttitor dictum.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas justo sed tincidunt malesuada.
                    Nullam efficitur, tortor sed suscipit laoreet, magna mi accumsan nunc, eget feugiat turpis velit quis massa.
                    Pellentesque pulvinar malesuada tortor ut pellentesque. Aenean porta nibh id condimentum congue.
                    Fusce laoreet lobortis sapien semper scelerisque. Sed eleifend magna in porttitor consequat.
                    Suspendisse faucibus purus et mi porttitor dictum.
                </p>

                <p>
                    In tempus laoreet ligula, eu placerat neque venenatis aliquam. Cras ultrices erat et orci semper facilisis.
                    Donec luctus odio dolor, at sodales tortor varius vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                    In justo diam, lacinia quis nulla non, congue rutrum eros. Nam ut libero id risus mollis sodales.
                    Nunc id tellus vitae urna vehicula bibendum. Sed consequat purus leo, id posuere diam gravida et. Fusce leo neque, tincidunt ac turpis eu, sagittis hendrerit leo.
                    Aliquam ut leo porttitor urna fringilla ullamcorper. Donec bibendum convallis lectus, sit amet volutpat metus imperdiet ac.
                    Proin eu dignissim turpis.
                </p> */}
            </Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={props.onHide}>Close</Button> */}
            </Modal.Footer>
        </Modal >
    );
}