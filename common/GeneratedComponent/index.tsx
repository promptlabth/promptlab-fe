import { GeneratedComponentProps } from "@/models/interfaces/GeneratedComponent.interface";
import { Prompt } from "@/models/types/prompt.type";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Container } from "react-bootstrap";
import { GeneratedComponentHeader } from "./Header";
import { GeneratedComponentList } from "./GeneratedComponentList";
import { GenerateMessageRequest } from "@/models/types/dto/requests/GeneratedMessageRequest.type";
import { apiGenerateMessage } from "@/services/api/GenerateMessageAPI";
import { featureTitleIdMap } from "@/constants/value.constant";
import styles from "./GeneratedComponent.module.css";
import { Wisesight } from "../WisesightComponent";
import { ExceedMessageLimitModal } from "../Modals/ExceedMessageLimitModal";
import { LoginModal } from "../Modals/LoginModal";
import { usePromptyContext } from "@/contexts/PromptyContext";

export const GeneratedComponent = (props: GeneratedComponentProps) => {
  const { titlePage, titleDescription } = props;
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [wisesightText, setWisesightText] = useState<string>("");
  const [showExceedLimitMessageModal, setShowExceedLimitMessageModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const featureName = `${pathname.slice(1)}`;
  const translate = t;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { tones, generatedMessageCount, user, handleLogin, updateGeneratedMessageCount } = usePromptyContext();


  const handleShowExceedLimitMessageModal = () =>
    setShowExceedLimitMessageModal(true);
  const handleCloseExceedLimitMessageModal = () =>
    setShowExceedLimitMessageModal(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleCopyTextFromWiseSight = (text: string) => setWisesightText(text);

  const handleInputTextChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
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

  const handleTypeChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
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
      i18n.language == "th"
        ? 1
        : i18n.language == "en"
        ? 9
        : i18n.language == "id"
        ? 17
        : 9;

    const newPrompt: Prompt = {
      input: "",
      tone_id: toneId,
      message: "",
      isGenerating: false,
    };
    setPrompts([...prompts, newPrompt]);
  };

  const handleDeleteRow = (index: number) => {
    setPrompts([
      ...prompts.slice(0, index),
      ...prompts.slice(index + 1, prompts.length),
    ]);
  };

  const handleGenerateMessage = async (index: number) => {
    if (generatedMessageCount === user?.maxMessages) {
      handleShowExceedLimitMessageModal();
      return;
    }

    if (!user) {
      handleShowLoginModal();
      return;
    }
    if (user) {
      setPrompts((prevPrompts) => {
        const updatedPrompts = [...prevPrompts];
        updatedPrompts[index] = {
          ...updatedPrompts[index],
          isGenerating: true,
        };
        return updatedPrompts;
      });
    }

    const prompt = prompts[index];
    try {
      const { input, tone_id } = prompt;
      const data: GenerateMessageRequest = {
        input_message: input,
        tone_id: tone_id,
        feature_id: featureTitleIdMap[titlePage],
      };
      const result = await apiGenerateMessage(data);
      if (result) {
        const message = result.reply;
        const updatedPrompts = [...prompts];
        updatedPrompts[index] = {
          ...prompt,
          message: message,
          isGenerating: false,
        };
        setPrompts(updatedPrompts);
        updateGeneratedMessageCount()
      }
    } catch {
      const updatedPrompts = [...prompts];
      updatedPrompts[index] = {
        ...prompts[index],
        message: "Error. Please try again",
        isGenerating: false,
      };
      setPrompts(updatedPrompts);
    }
  };

  
  useEffect(() => {
    if (prompts.length === 0) {
      handleAddNewRow();
    }
  }, [prompts]);

  useEffect(() => {
    // Set the first prompt's input to the text value
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[prompts.length - 1] = {
        ...updatedPrompts[prompts.length - 1],
        input: wisesightText,
      };
      return updatedPrompts;
    });

    const textArea = textAreaRef.current;
    // Adjust textarea height
    if (textArea) {
      textArea.style.height = "auto"; // Reset height to recalculate
      textArea.style.height = `${textArea.scrollHeight}px`;
      textArea.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [wisesightText]);

  return (
    <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
      <Container className={styles.page_container}>
        <LoginModal 
          title="modal.pleaseLoginBeforeGenerate"
          translate={translate}
          showModal={showLoginModal}
          handleCloseModal={handleCloseLoginModal}
          handleLogin={handleLogin}
        />
        <ExceedMessageLimitModal
          translate={translate}
          showModal={showExceedLimitMessageModal}
          handleCloseModal={handleCloseExceedLimitMessageModal}
        />
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
          handleGenerateMessage={handleGenerateMessage}
          textAreaRef={textAreaRef}
          generatedMessageCount={generatedMessageCount!}
        />
        <Wisesight handleCopyTextFromWiseSight={handleCopyTextFromWiseSight} />
      </Container>
    </Container>
  );
};
