import Modal from 'react-bootstrap/Modal';
import { t } from "../language";
import { useLanguage } from "@/language/ LanguageContext";
import { Button, Container } from 'react-bootstrap';
import { Noto_Sans_Thai } from 'next/font/google'
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb"
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['latin'] })

export const PageDescriptionModal = (props: any) => {
    const { language } = useLanguage();

    const featureKey :  {[key: string]: string[]}= {
        "createSellingPost.title": ["modal.description.inputMessage.createSellingPost", "/DemoSellingPost.mp4"],
        "createEmail.title": ["modal.description.inputMessage.createEmail", "/DemoEmail.mp4"],
        "createArticle.title": ["modal.description.inputMessage.createArticle", "/DemoArticle.mp4"],
        "createScripts.title": ["modal.description.inputMessage.createScripts", "/DemoVideoScript.mp4"],
        "createClickBait.title": ["modal.description.inputMessage.createClickBait", "/DemoClickBait.mp4"]
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={noto_sans_thai.className}
        >
            <Modal.Header closeButton>
                <Container fluid className="d-flex justify-content-center">
                    <Modal.Title className="fs-1 text">
                        <b>{t(props.config.titlePage, language)}</b>
                    </Modal.Title>
                </Container>


            </Modal.Header>
            <Modal.Body>

                <div className="ratio ratio-16x9">
                    <iframe className="rounded-3" src={featureKey[props.config.titlePage][1]} title="Demo video"></iframe>
                </div>

                <div className="text-center p-4">
                    <h4>{t(props.config.titleDescription, language)}</h4>
                </div>

                <Container className="p-3">
                    <h2><b>{t("modal.title.howToUse", language)}</b></h2>
                    <hr className="mt-0 hr hr-blurry" />
                    <Container className="pb-4">
                        <div className="d-flex">
                            <TbCircleNumber1 className="fs-1" />
                            <h4 className="ps-2 pt-2 fw-bold">{t("modal.title.inputMessage", language)}</h4>
                        </div>
                        <div className="ps-4 ms-4 me-4 fs-5">
                            <p>{t(featureKey[props.config.titlePage][0], language)}</p>
                        </div>
                    </Container>

                    <Container className="pb-4">
                        <div className="d-flex">
                            <TbCircleNumber2 className="fs-1" />
                            <h4 className="ps-2 pt-2 fw-bold">{t("modal.title.selectType", language)}</h4>
                        </div>
                        <div className="ps-4 ms-4 me-4 fs-5">
                            <p> {t("modal.description.selectType", language)}</p>
                        </div>
                    </Container>

                    <Container>
                        <div className="d-flex">
                            <TbCircleNumber3 className="fs-1" />
                            <h4 className="ps-2 pt-2 fw-bold">{t("modal.title.clickGenerate", language)}</h4>
                        </div>
                    </Container>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" size="lg" onClick={props.onHide}>
                    {language === "th" ? "ปิด" : "Close"}
                </Button>
            </Modal.Footer>
        </Modal >
    );
}