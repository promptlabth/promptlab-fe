import { useState } from "react";

type ComponentProps = {
  input: string;
  type: string;
  message: string;
};

const SocialMediaPostTable = () => {
  const API_URL = "https://api.openai.com/v1/completions";
  const API_KEY = "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";
  const MODEL_NAME = "text-davinci-003";
  const TEMPERATURE = 0.5;
  const MAX_TOKENS = 2000;

  const [components, setComponents] = useState<ComponentProps[]>([]);

  const handleSendSocialMediaPost = async (index: number) => {
    const { input, type } = components[index];
    const prompt = `create post on social media to sell ${input} and the message is ${type}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          prompt: prompt,
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
      updatedComponents[index] = { ...updatedComponents[index], type: newType };
      return updatedComponents;
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Input</th>
            <th>Type</th>
            <th>Message</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {components.map(({ input, type, message }, index) => (
            <tr key={index}>
              <td>
                <textarea
                  value={input}
                  onChange={(event) => handleInputTextChange(index, event)}
                  required
                />
              </td>
              <td>
                <select
                  value={type}
                  onChange={(event) => handleTypeChange(index, event)}
                  required
                >
                  <option value="funny">Funny</option>
                  <option value="confident">Confident</option>
                  <option value="professional">Professional</option>
                  <option value="luxury">Luxury</option>
                  <option value="educational">Educational</option>
                  <option value="happy">Happy</option>
                </select>
              </td>
              <td>
                <span>{message}</span>
              </td>
              <td>
                <button onClick={() => handleSendSocialMediaPost(index)}>
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddNewRow}>Add New Row</button>
    </div>
  );
};

export default SocialMediaPostTable
