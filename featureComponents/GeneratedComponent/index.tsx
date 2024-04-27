import { useUserContext } from "@/contexts/UserContext";
import { GeneratedComponentProps } from "@/models/interfaces/GeneratedComponent.interface"
import { Prompt } from "@/models/types/prompt.type";
import { Tones } from "@/models/types/tone.type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaClosedCaptioning } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineArticle, MdSell } from "react-icons/md";
import { useTranslation } from "next-i18next";

// Define an object mapping paths to icons
// @Attribute
// icons: An object where each key represents a path and its corresponding value is a JSX.Element representing an icon component.
// The keys are strings representing different paths related to specific functionalities.
// The values are JSX elements, each rendering a different icon component with a specific size (fontSize).
const icons: { [key: string]: JSX.Element } = {
  "/createSellingPost": <MdSell fontSize={96} />,
  "/createIdeaContent": <HiOutlineLightBulb fontSize={96} />,
  "/createArticle": <MdOutlineArticle fontSize={96} />,
  "/createShortVideoScripts": <AiFillVideoCamera fontSize={96} />,
  "/createClickBaitWord": <FaClosedCaptioning fontSize={96} />
};

export const GeneratedComponent = (props: GeneratedComponentProps) => {
  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [tones, setTones] = useState<Tones[]>([]);
  const userContext = useUserContext()
  const user = userContext?.user
  const featureName = `${pathname.slice(1)}`

  const translate = (t: string) => i18n?.t(t)


  const handleInputTextChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newInput = event.target.value;
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[index] = {
        ...updatedPrompts[index],
        input: newInput,
      };
      return updatedPrompts;
    });
  };

  const handleTypeChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newTypeValue = parseInt(event.target.value, 10);
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[index] = {
        ...updatedPrompts[index],
        tone_id: newTypeValue,
      };
      return updatedPrompts;
    });
  };

  const handleAddNewRow = () => {
    const toneId =
      i18n.language == "th" ? 1 :
        i18n.language == "en" ? 9 :
          i18n.language == "id" ? 17 : 9

    const newPrompt: Prompt = {
      input: "",
      tone_id: toneId,
      message: "",
      isGenerating: false
    }
    setPrompts([...prompts, newPrompt]);
  };

  const handleDeleteRow = (index: number) => {
    setPrompts([
      ...prompts.slice(0, index),
      ...prompts.slice(index + 1, prompts.length)
    ]);
  }

  useEffect(() => {
    if (prompts.length === 0) {
      handleAddNewRow();
    }
  }, [prompts]);

  return (
    <>
    </>
  )
}