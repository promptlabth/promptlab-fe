import { generateImage, openApiImageConfig } from "@/api/OpenApiEngine";
import { CreateImageRequestSizeEnum } from "openai";
import { useState } from "react";

const ImageGenerator = () => {
    const [config, setConfig] = useState<openApiImageConfig>({
        promptEn: "",
        promptTh: "",
        numberImage: 1,
        isTh: false,
        size: "256x256",
    });

    const [imageURL, setImageURL] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setConfig({
            ...config,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const url = await generateImage(config);
        setImageURL(url.data);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setConfig({
            ...config,
            isTh: event.target.value === "TH"
        });
    };

    return (
        <div>
            <h1>Image Generator</h1>
            {!config.isTh ?
                <label>
                    Prompt EN:
                    <textarea name="promptEn" value={config.promptEn} onChange={handleChange} />
                </label>
                :
                <label>
                    Prompt TH:
                    <textarea name="promptTh" value={config.promptTh} onChange={handleChange} />
                </label>
            }
            <label>
                Language:
                <select
                    className="form-select bg-dark text-light"
                    value={config.isTh ? "TH" : "EN"}
                    onChange={(event) => handleLanguageChange(event)}
                    required
                >
                    <option value="EN">English</option>
                    <option value="TH">Thai</option>
                </select>
            </label>
            <label>
                Image Size:
                <select name="size" value={config.size} onChange={handleChange}>
                    <option value={"256x256"}>256x256</option>
                    <option value={"512x512"}>512x512</option>
                    <option value={"1024x1024"}>1024x1024</option>
                </select>
            </label>
            <button onClick={handleSubmit}>Generate Image</button>
            <div>Generated Image URL: {imageURL && <img src={imageURL} />} </div>
        </div>

    )


};


export default ImageGenerator;
