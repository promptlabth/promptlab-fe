import gennerateMassage, { openApiMassageConfig } from "@/api/OpenApiEngine";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from 'next/router';


import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillClipboardFill, BsFillClipboardCheckFill } from 'react-icons/bs';
import { GoDiffAdded } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
import { AiOutlineSend } from 'react-icons/ai';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ToggleSwitch from "../starndart/ToggleSwitch";
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "../language";
import { Button, Col, Container, Row } from "react-bootstrap";
import { PageDescriptionModal } from "../modals/PageDescriptionModal";
import generateMessageWithBackend from "@/api/OpenAiBackend";


type ComponentProps = {
    input: string;
    type: string;
    message: string;
};

type ApiResponse = {
    response?: string;
    error?: string;
};

export type modelCofig = {
    model: string;
    temperature: number;
    maxToken: number;
}

export type pageConfig = {
    titlePage: string;
    titleDescription: string;
    modelConfig: modelCofig;
    promptEn: (input: string, type: string) => string;
    promptTh: (input: string, type: string) => string;
}

const TableComponents = (config: pageConfig) => {
    const [components, setComponents] = useState<ComponentProps[]>([]);
    const [isTh, setIsTh] = useState(true);
    const { language, setLanguage } = useLanguage();
    const [modalShow, setModalShow] = useState(false);
    const [pathname, setPathname] = useState<string>("createSellingPost")
    const router = useRouter()


    const postTypes = [
        { value: "funny", label: t('table.type.funny', language) },
        { value: "confident", label: t('table.type.confident', language) },
        { value: "professional", label: t('table.type.professional', language) },
        { value: "luxury", label: t('table.type.luxury', language) },
        { value: "educational", label: t('table.type.educational', language) },
        { value: "happy", label: t('table.type.happy', language) },
        { value: "modern", label: t('table.type.modern', language) },
        { value: "retro", label: t('table.type.retro', language) },
    ];


    const CopyToClipboardButton = ({ message }: { message: string }) => {
        const [isCopied, setIsCopied] = useState(false);

        const renderTooltip = (props: any) => (
            <Tooltip id="button-tooltip" {...props}>
                {isCopied ? <span className="fs-6"> Copied </span> : <span className="fs-6"> Copy to Clipboard </span>}
            </Tooltip>
        );

        const handleCopy = () => { setIsCopied(true); }

        return (
            <OverlayTrigger
                placement="top"
                delay={{ show: 50, hide: 50 }}
                overlay={renderTooltip}
            >
                <CopyToClipboard text={message} onCopy={handleCopy}>
                    <div className="">
                        {!isCopied ?
                            <button type="button" className="btn btn-secondary btn-sm">
                                <BsFillClipboardFill />
                            </button> :
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                style={{ background: "#16942C" }}
                                onMouseLeave={() => {
                                    setTimeout(() => {
                                        setIsCopied(false);
                                    }, 1000);
                                }}>
                                <BsFillClipboardCheckFill />
                            </button>
                        }
                    </div>

                </CopyToClipboard>
            </OverlayTrigger>


        );

    }

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setIsTh(event.target.checked);

        const newLanguage = event.target.checked ? 'th' : 'en';
        setLanguage(newLanguage);

    };




    const GenerateButton = ({ index }: { index: number }) => {
        const [loading, setLoading] = useState(false);

        const handleClick = () => {
            setLoading(true);
            handleSendSocialMediaPost(index);
        };

        return (
            <button
                className={`btn btn-outline-secondary text-light ${loading ? "disabled" : ""}`}
                type="button"
                onClick={handleClick}
                style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
            >
                {loading ?
                    <div className="d-flex">
                        <div className="pe-2 ps-2">
                            <div className="spinner-border spinner-border-sm"></div>
                        </div>
                        <div className="pe-2"> Generating... </div>
                    </div>
                    :
                    <div className="d-flex pe-2 ps-2">
                        <div className="pe-2">
                            <AiOutlineSend size={20} />
                        </div>
                        <div className=""> Generate </div>
                    </div>
                }
            </button>
        );
    };

    const handleSendSocialMediaPost = async (index: number) => {
        const { input, type } = components[index];
        config.promptEn(input, type)
        config.promptEn(input, type)

        const apiConfig: openApiMassageConfig = {
            isTh: isTh,
            promptEn: config.promptEn(input, type),
            promptTh: config.promptTh(input, type),
            ...config.modelConfig
        }



        try {
            const message = await generateMessageWithBackend(apiConfig) ?? 'Error Please try again'

            setComponents((prevComponents) => {
                const updatedComponents = [...prevComponents];
                updatedComponents[index] = { ...updatedComponents[index], message };
                return updatedComponents;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddNewRow = () => {
        setComponents([...components, { input: "", type: "funny", message: "" }]);
    };

    const handleInputTextChange = (
        index: number,
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newInput = event.target.value;

        setComponents((prevComponents) => {
            const updatedComponents = [...prevComponents];
            updatedComponents[index] = {
                ...updatedComponents[index],
                input: newInput,
            };
            return updatedComponents;
        });
    };


    const handleTypeChange = (
        index: number,
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newType = event.target.value;
        setComponents((prevComponents) => {
            const updatedComponents = [...prevComponents];
            updatedComponents[index] = {
                ...updatedComponents[index],
                type: newType,
            };
            return updatedComponents;
        });
    };

    useEffect(() => {
        if (components.length == 0) {
            handleAddNewRow();
        }
        if (router.pathname.slice(1,).length !== 0){
            setPathname(router.pathname.slice(1,))
        }
    }, []);

    return (
        <Container fluid className="p-0 bg-dark bg-lighten-xs pt-5">
            <Container fluid className="pt-5 pb-2" style={{ backgroundColor: "#1F1F21" }}>
                <figure className="text-center pt-4 pb-4 text-light">
                    <blockquote className="blockquote">
                        <p className="display-4">{t(config.titlePage, language)}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        {t(config.titleDescription, language)}
                    </figcaption>
                </figure>
                <div className="text-light text-center">
                    <h3>{t("language", language)}</h3>
                    <ToggleSwitch isOn={isTh} handleToggle={handleToggle} />
                    <p>{isTh ? 'TH' : 'EN'}</p>
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-light" className="d-flex" onClick={() => setModalShow(true)}>
                            <div className="fs-5"> {t("button.learnMore", language)} </div>
                            <div className="fs-5 ps-2">
                                <IoIosArrowForward />
                            </div>
                        </Button>
                    </div>
                </div>

            </Container>

            {/* Table component */}

            <Container fluid className="pt-2 ps-4 pe-4">

                {components.map(({ input, type, message }, index) => (
                    <Row key={index} className="styled-row justify-content-center text-light my-2">
                        {/* Input Textfield */}
                        <Col xs={12} md={3} className="pb-2">
                            {/* <Col xs={12} md={2} className="pb-2 border"> */}
                            <Col className="fs-5" xs={12} md={12}>{t('table.input.title', language)}</Col>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom" />
                            <div className="pt-2">
                                <textarea
                                    // placeholder={`placeholder.${router.pathname}`}
                                    placeholder={t(`placeholder.${pathname}`, language)}
                                    className="form-control bg-dark text-light"
                                    value={input}
                                    onChange={(event) => handleInputTextChange(index, event)}
                                    required
                                />
                            </div>
                        </Col>
                        {/* Type Dropdown */}
                        {/* <Col xs={12} md={"auto"} lg={"auto"} xl={"auto"} className="border pb-2"> */}
                        <Col className="pb-2">
                            <Col className="fs-5" xs={12} md={9}>{t('table.type.title', language)}</Col>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom" />
                            <Col sm className="pt-2">
                                <select
                                    className="form-select bg-dark text-light"
                                    value={type}
                                    onChange={(event) => handleTypeChange(index, event)}
                                    required
                                >
                                    {postTypes.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>


                            </Col>
                        </Col>
                        {/* Message */}
                        <Col xs={12} md={4} lg={5} xl={6} className="pb-2">
                            <Col className="fs-5" xs={12} md={6}>{t('table.massage.title', language)}</Col>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom" />
                            <div className="pt-1">
                                {/* If message length is 0, show "No generated message..." */}
                                {message.length === 0 && (
                                    <span className="text-white-50">{t("table.no_message", language)}</span>
                                )}

                                {/* If there is a message */}
                                {message.length > 0 && (
                                    <Container fluid className="">
                                        <Row>
                                            <Col className="d-flex p-0 justify-content-end">
                                                {/* Copy to Clipboard component */}
                                                <CopyToClipboardButton message={message} />
                                            </Col>
                                            <Col xs={12} className="text-light p-0 mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                                                {message}
                                            </Col>
                                        </Row>
                                    </Container>
                                )}
                            </div>
                        </Col>

                        {/* Generate Button */}
                        <div className="col p-0" >
                            <div className="pt-3 d-flex justify-content-center">
                                <GenerateButton index={index} />
                            </div>
                        </div>
                    </Row>
                ))}
            </Container>

            {/* Button Container */}
            <Container fluid className="p-1 ps-3 pb-4">
                <Button variant="outline-light" onClick={handleAddNewRow}>
                    <div className="d-flex pe-2">
                        <div className="pe-2">
                            <GoDiffAdded size={20} />
                        </div>
                        <div className=""> {t("button.newRow", language)} </div>
                    </div>
                </Button>

            </Container>
            {/*  */}
            <PageDescriptionModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                config={config}
            />
        </Container>
    );
};

export default TableComponents
