import { useState, useEffect, ChangeEvent } from "react";
import ToggleSwitch from "./starndart/ToggleSwitch";

type ComponentProps = {
    input: string;
    type: string;
    message: string;
};

const postTypes = [
    { value: "funny", label: "Funny" },
    { value: "confident", label: "Confident" },
    { value: "professional", label: "Professional" },
    { value: "luxury", label: "Luxury" },
    { value: "educational", label: "Educational" },
    { value: "happy", label: "Happy" },
];


const SocialMediaPostTable = () => {
    const API_URL = "https://api.openai.com/v1/completions";
    const API_KEY = process.env.openAPI_KEY;
    const MODEL_NAME = "text-davinci-003";
    const TEMPERATURE = 0.5;
    const MAX_TOKENS = 2000;

    const [components, setComponents] = useState<ComponentProps[]>([]);
    const [isTh, setIsTh] = useState(false);

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setIsTh(event.target.checked);
    };

    const GenerateButton = ({ index }: { index: number }) => {
        const [loading, setLoading] = useState(false);

        const handleClick = () => {
            setLoading(true);
            handleSendSocialMediaPost(index);
        };

        return (
            <button
                className={`btn btn-outline-secondary text-light ${loading ? "disabled" : ""
                    }`}
                type="button"
                onClick={handleClick}
            >
                {loading ? "Generating..." : "Generate"}
            </button>
        );
    };

    const handleSendSocialMediaPost = async (index: number) => {
        const { input, type } = components[index];
        const prompt = `create post on social media to sell ${input} and the message is ${type}`;
        const prompt_th = prompt + "in thai";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: MODEL_NAME,
                    prompt: isTh ? prompt_th : prompt,
                    temperature: TEMPERATURE,
                    max_tokens: MAX_TOKENS,
                }),
            });
            const data = await response.json();
            const message = data.choices[0].text;

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
        handleAddNewRow();
    }, []);

    return (
        <div className="container-fluid bg-dark bg-lighten-xs pt-5">
            <div className="container pt-5">
                <figure className="text-center pt-4 pb-4 text-light">
                    <blockquote className="blockquote">
                        <p className="display-4">Create your selling post</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        Using powerful AI to make your selling more convenient!!!
                    </figcaption>
                </figure>
                <div className="text-light text-center">
                    <h3>Language </h3>
                    <ToggleSwitch isOn={isTh} handleToggle={handleToggle} />
                    <p>{isTh ? 'TH' : 'EN'}</p>
                </div>
            </div>

            {/* Table component */}
            <div className="container-fluid" style={{ minHeight: "90vh" }}>

                <table className="table table-dark table-striped table-bordered" >
                    <thead>
                        <tr className="text-light text-center">
                            <th >Input</th>
                            <th >Type</th>
                            <th >Message</th>
                            <th >Send</th>
                        </tr>
                    </thead>


                    <tbody >
                        {components.map(({ input, type, message }, index) => (
                            <tr key={index} >

                                {/* Input Textfield */}
                                <td className="w-25">
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
                                    {<span className="text-light">{message}</span>}
                                </td>
                                <td>
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

export default SocialMediaPostTable
