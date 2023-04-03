import gennerateMassage, { openApiMassageConfig } from "@/api/OpenApiEngine";
import { useState, useEffect, ChangeEvent } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillClipboardFill, BsFillClipboardCheckFill } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ToggleSwitch from "../starndart/ToggleSwitch";
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "../language";




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


const postTypes = [
    { value: "funny", label: "Funny" },
    { value: "confident", label: "Confident" },
    { value: "professional", label: "Professional" },
    { value: "luxury", label: "Luxury" },
    { value: "educational", label: "Educational" },
    { value: "happy", label: "Happy" },
];




const TableComponents = (config: pageConfig) => {
    const [components, setComponents] = useState<ComponentProps[]>([]);
    const [isTh, setIsTh] = useState(true);
    const { language, setLanguage } = useLanguage();

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
                            <div className="pe-2">
                                <div className="spinner-border spinner-border-sm"></div>
                            </div>
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
        <div className="container-fluid bg-dark bg-lighten-xs pt-5">
            <div className="scontainer pt-5">
                <figure className="text-center pt-4 pb-4 text-light">
                    <blockquote className="blockquote">
                        <p className="display-4">{config.titlePage}</p>
                        {}
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        {/* Using powerful AI to make your all things {t('navbar.title.createSellPost')} */}
                    </figcaption>
                </figure>
                <div className="text-light text-center">
                    <h3>Language </h3>
                    <ToggleSwitch isOn={isTh} handleToggle={handleToggle} />
                    <p>{isTh ? 'TH' : 'EN'}</p>
                </div>
            </div>

            {/* Table component */}
            <div className="container-fluid table-responsive">

                <table className="table table-dark table-striped table-bordered table-hover" >
                    <thead>
                        <tr className="text-light text-center">
                            <th >Input</th>
                            <th >Type</th>
                            <th>Message</th>
                            <th className="fixed-col"></th>
                        </tr>
                    </thead>


                    <tbody >
                        {components.map(({ input, type, message }, index) => (
                            <tr key={index} >

                                {/* Input Textfield */}
                                <td className="">
                                    <textarea
                                        className="form-control bg-dark text-light"
                                        value={input}
                                        onChange={(event) => handleInputTextChange(index, event)}
                                        required
                                    />
                                </td>
                                <td className="col-2">
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
                                </td>
                                <td className="col-6">
                                    {/* If message lenght is 0, show "No generated message..." */}
                                    {message.length == 0 &&
                                        <span className="text-white-50"> No generated message... </span>
                                    }

                                    {/* If there is message */}
                                    {message.length > 0 &&
                                        <div className="container">
                                            <div className="row">
                                                <div className="d-flex p-0 justify-content-end">
                                                    {/* Copy to Clipboard component */}
                                                    <CopyToClipboardButton message={message} />
                                                </div>
                                                <span className="text-light p-0 mb-3" style={{ whiteSpace: "pre-wrap" }}>{message}</span>

                                            </div>

                                        </div>
                                    }
                                </td>
                                <td className="fixed-col p-3 text-center">
                                    <GenerateButton index={index} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Button Container */}
            <div className="p-1 ps-3 pb-4">
                <button
                    className="btn btn-outline-light"
                    onClick={handleAddNewRow}
                >
                    Add New Row
                </button>
            </div>
        </div>
    );
};

export default TableComponents
