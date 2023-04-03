import gennerateMassage, { openApiMassageConfig } from "@/api/OpenApiEngine";
import { useState, useEffect, ChangeEvent } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillClipboardFill, BsFillClipboardCheckFill } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ToggleSwitch from "../starndart/ToggleSwitch";
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "../language";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

type ComponentProps = {
    input: string;
    type: string;
    message: string;
};

export type modelCofig = {
    model: string;
    temperature: number;
    maxToken: number;
}

export type pageConfig = {
    titlePage: string;
    modelConfig: modelCofig;
    promptEn: (input: string, type: string) => string;
    promptTh: (input: string, type: string) => string;
}

const TableComponents = (config: pageConfig) => {
    const [components, setComponents] = useState<ComponentProps[]>([]);
    const [isTh, setIsTh] = useState(true);
    const { language, setLanguage } = useLanguage();

    const postTypes = [
        { value: "funny", label: t('table.type.funny', language) },
        { value: "confident", label: t('table.type.confident', language) },
        { value: "professional", label: t('table.type.professional', language) },
        { value: "luxury", label: t('table.type.luxury', language) },
        { value: "educational", label: t('table.type.educational', language) },
        { value: "happy", label: t('table.type.happy', language) },
    ];

    const CopyToClipboardButton = ({ message }: { message: string }) => {
        const [isCopied, setIsCopied] = useState(false);

        const renderTooltip = (props: any) => (
            <Tooltip id="button-tooltip" {...props}>
                {isCopied ? <span className="fs-6"> Copied </span> : <span className="fs-6"> Copy to Clipboard </span>}
            </Tooltip>
        );

        const handleCopy = () => {
            setIsCopied(true);
        }

        return (
            <OverlayTrigger
                placement="top"
                delay={{ show: 50, hide: 50 }}
                overlay={renderTooltip}
            >
                <CopyToClipboard text={message} onCopy={handleCopy}>
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
            <div>
                <button
                    className={`btn btn-outline-secondary text-light ${loading ? "disabled" : ""}`}
                    type="button"
                    onClick={handleClick}
                >
                    {loading ?
                        <div className="d-flex">
                            {/* <div className="pe-2">
                                <div className="spinner-border spinner-border-sm"></div>
                            </div> */}
                            <div> Generating... </div>
                        </div>
                        :
                        "Generate"
                    }
                </button>
            </div>
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
            const message = await gennerateMassage(apiConfig) ?? 'Error Please try again'

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
    }, []);

    return (
        <Container fluid className="p-0 bg-dark bg-lighten-xs pt-5">
            <Container fluid className="pt-5 pb-2" style={{backgroundColor:"#1F1F21"}}>
                <figure className="text-center pt-4 pb-4 text-light">
                    <blockquote className="blockquote">
                        <p className="display-4">{t(config.titlePage, language)}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        {t('table.description', language)}
                    </figcaption>
                </figure>
                <div className="text-light text-center">
                    <h3>Language</h3>
                    <ToggleSwitch isOn={isTh} handleToggle={handleToggle} />
                    <p>{isTh ? 'TH' : 'EN'}</p>
                </div>
            </Container>

            {/* Table component */}

            <Container fluid className="pt-2 ps-4 pe-4">

                {components.map(({ input, type, message }, index) => (
                    <Row key={index} className="styled-row text-light my-2">
                        {/* Input Textfield */}
                        <Col xs={12} md={2} className="pb-2">
                            <Col className="fs-5" xs={12} md={12}>{t('table.input.title', language)}</Col>
                            <textarea
                                className="form-control bg-dark text-light"
                                value={input}
                                onChange={(event) => handleInputTextChange(index, event)}
                                required
                            />
                        </Col>
                        {/* Type Dropdown */}
                        <Col xs={12} md={"auto"} lg={"auto"} xl={"auto"} className="pb-2">
                            <Col className="fs-5" xs={12} md={9}>{t('table.type.title', language)}</Col>
                            <Col sm className="">
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
                        <Col xs={12} md={5} lg={6} xl={7} className="pb-2">
                            <Col className="fs-5" xs={12} md={6}>{t('table.massage.title', language)}</Col>
                            {/* If message length is 0, show "No generated message..." */}
                            {message.length === 0 && (
                                <span className="text-white-50">{t("table.no_message", language)}</span>
                            )}

                            {/* If there is a message */}
                            {message.length > 0 && (
                                <Container className="">
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
                        </Col>
                        {/* Generate Button */}
                        <Col xs={12} md={"auto"} className="p-3 pb-0">
                            <GenerateButton index={index} />
                        </Col>
                    </Row>
                ))}
            </Container>

            {/* Button Container */}
            <Container fluid className="p-1 ps-3 pb-4">
                <Button variant="outline-light" onClick={handleAddNewRow}>
                    {t("button.newRow", language)}
                </Button>
            </Container>
        </Container>
    );
};

export default TableComponents
