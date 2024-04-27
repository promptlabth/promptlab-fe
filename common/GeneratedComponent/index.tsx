import { useUserContext } from "@/contexts/UserContext";
import { GeneratedComponentProps } from "@/models/interfaces/GeneratedComponent.interface"
import { Prompt } from "@/models/types/prompt.type";
import { Tones } from "@/models/types/tone.type";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Container } from "react-bootstrap";
import { GeneratedComponentHeader } from "./Header";
import { GeneratedComponentList } from "./GeneratedComponentList";
import { apiGetTones } from "@/services/api/ToneAPI";
import styles from "./GeneratedComponent.module.css";
// Define an object mapping paths to icons
// @Attribute
// icons: An object where each key represents a path and its corresponding value is a JSX.Element representing an icon component.
// The keys are strings representing different paths related to specific functionalities.
// The values are JSX elements, each rendering a different icon component with a specific size (fontSize).


export const GeneratedComponent = (props: GeneratedComponentProps) => {
  const { titlePage, titleDescription, prompt } = props
  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [tones, setTones] = useState<Tones[]>([]);
  const userContext = useUserContext()
  const user = userContext?.user
  const featureName = `${pathname.slice(1)}`
  const translate = t;


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

  const fetchTones = async () => {
    try {
      const language = i18n.language === "en" ? "eng" : i18n.language
      const data = await apiGetTones(language);
      setTones(data);
    } catch(error) {
      console.error(error);
    }
  }


  const fetchData = async () => {
    
  }

  useEffect(() => {
    if (prompts.length === 0) {
      handleAddNewRow();
    }
  }, [prompts]);

  useEffect(() => {
    fetchTones()
  },[i18n.language])

  return (
    <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
      <Container className={styles.page_container}>
        <GeneratedComponentHeader
          translate={translate}
          pathname={pathname}
          titlePage={titlePage}
          titleDescription={titleDescription}
        />
        <GeneratedComponentList
          featureName={featureName}
          translate={translate}
          user={user}
          tones={tones}
          prompts={prompts}
          handleInputTextChange={handleInputTextChange}
          handleTypeChange={handleTypeChange}
          handleAddNewRow={handleAddNewRow}
          handleDeleteRow={handleDeleteRow}
        />
      </Container>
    </Container>
  )
}