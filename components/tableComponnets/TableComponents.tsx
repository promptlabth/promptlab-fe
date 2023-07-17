import { useState, useEffect, } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillClipboardFill, BsFillClipboardCheckFill } from 'react-icons/bs';
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineSend, AiFillVideoCamera } from 'react-icons/ai';
import { MdSell, MdOutlineArticle } from 'react-icons/md';
import { HiOutlineLightBulb } from 'react-icons/hi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaClosedCaptioning } from 'react-icons/fa';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "../../languages/language";
import { Col, Container, Row } from "react-bootstrap";
import { generateMessage, generateMessageWithUser } from "@/api/GenerateMessageAPI";
import { ImCross } from 'react-icons/im';
import styles from "./styles.module.css";
import { Noto_Sans_Thai } from 'next/font/google'
import { Tones } from "@/models/tones";
import { GenerateMessage, UserGenerateMessage } from "@/models";
import { useUserContext } from "@/contexts/UserContext";
import { features } from "@/constant";
import { usePathname } from 'next/navigation'
import { GetTonesByID } from "@/api/ToneAPI";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

type Prompt = {
   input: string;
   tone_id: number;
   message: string;
   generate_status: boolean;
};

// Define an OpenAI configuration data type
// @Attribute
// modelConfig: Represents the configuration data for OpenAI.
// It is an object with the following properties:
// - model: A string representing the model to be used. e.g. "gpt-3.5-turbo", "gpt-4.0"
// - temperature: A number representing the temperature value for generating text.
// - maxToken: A number representing the maximum number of tokens allowed in the generated text.
export type modelCofig = {
   model: string;
   temperature: number;
   maxToken: number;
}

// Define a Page configuration data type
// @Attribute
// -  titilePage : A string representing title of page
// -  titleDescription : A string representing page description, which describe what a page is.
// -  modelConfig: A configuration object for the page, specifying the OpenAI model and its settings.
// -  getPrompt: A function that takes an input string and a type string as parameters, and 
//    returns a generated message based on the provided prompt and language.
type pageConfig = {
   titlePage: string;
   titleDescription: string;
   modelConfig: modelCofig;
   prompt: (input: string, type: string) => string;
}

const TableComponents = (config: pageConfig) => {
   const [prompts, setPrompts] = useState<Prompt[]>([]);
   const userContext = useUserContext()
   const { language, tones } = useLanguage();
   const pathname = usePathname()
   const featureName = `${pathname.slice(1)}`

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

   const GenerateButton = ({ index, generate_status }: { index: number, generate_status: boolean }) => {
      const handleClick = () => {
         setPrompts((prevComponents) => {
            const updatedComponents = [...prevComponents];
            updatedComponents[index] = {
               ...updatedComponents[index],
               generate_status: true,
            };
            return updatedComponents;
         });
         handleGenerateMessage(index);
      };

      return (
         <>
            {generate_status ?
               <button
                  className={styles.page_prompt_loading_generate_btn}
                  type="button"
                  onClick={handleClick}
                  disabled={true}
                  style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
               >
                  <div className="d-flex">
                     <div className="pe-2 ps-2">
                        <div className="spinner-border spinner-border-sm"></div>
                     </div>
                     <div className="pe-2"> Generating </div>
                  </div>
               </button>
               :
               <button
                  className={styles.page_prompt_generate_btn}
                  type="button"
                  onClick={handleClick}
                  style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
               >
                  <div className="d-flex pe-2 ps-2">
                     <div className="pe-2">
                        <AiOutlineSend size={20} />
                     </div>
                     <div className=""> Generate </div>
                  </div>
               </button>
            }
         </>
      );
   };

   const handleGenerateMessage = async (index: number) => {
      const { input, tone_id } = prompts[index];
      const tone = await GetTonesByID(tone_id)
      const prompt = config.prompt(input, tone.tone_name)
      const data: UserGenerateMessage | GenerateMessage = userContext?.user
         ? {
            user_id: userContext.user.firebase_id,
            prompt: prompt,
            input_message: input,
            model: config.modelConfig.model,
            tone_id: tone_id,
            feature_id: features[config.titlePage],
         }
         : {
            prompt: prompt,
            input_message: input,
            model: config.modelConfig.model,
            tone_id: tone_id,
            feature_id: features[config.titlePage],
         };


      console.log("generate payload", data)
      const result =
         userContext?.user == null ?
            await generateMessage(data) ?? 'Error Please try again' :
            await generateMessageWithUser(data) ?? 'Error Please try again'

      console.log(result)
      const message = result.reply
      setPrompts((prevComponents) => {
         const updatedComponents = [...prevComponents];
         updatedComponents[index] = { ...updatedComponents[index], message, generate_status: false };
         return updatedComponents;
      });
   };

   const handleInputTextChange = (
      index: number,
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      const newInput = event.target.value;

      setPrompts((prevComponents) => {
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
      setPrompts((prevComponents) => {
         const updatedComponents = [...prevComponents];
         updatedComponents[index] = {
            ...updatedComponents[index],
            tone_id: parseInt(newType),
         };
         return updatedComponents;
      });
      console.log(newType)
   };

   const handleAddNewRow = () => {
      setPrompts([...prompts, {
         input: "",
         tone_id: language === "th" ? 1 : 9,
         message: "",
         generate_status: false
      }]);
   };

   const handleDeleteRow = (index: number) => {
      setPrompts([
         ...prompts.slice(0, index),
         ...prompts.slice(index + 1, prompts.length)
      ]);
   }

   useEffect(() => {
      if (prompts.length == 0) {
         handleAddNewRow();
      }
   }, [prompts]);

   return (
      <div className={noto_sans_thai.className}>
         <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
            <Container className={styles.page_container}>

               <figure className="text-center pt-4 pb-4 text-light">
                  <div className="pb-2"> {icons[pathname]} </div>
                  <blockquote className="blockquote">
                     <p className="display-4 fw-bold">{translate(config.titlePage, language)}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                     {translate(config.titleDescription, language)}
                  </figcaption>
               </figure>

               <Container fluid={true} className={styles.page_prompt_area}>
                  {prompts.map(({ input, tone_id, message, generate_status }, index) => (
                     <Row key={index} className={styles.page_prompt_area_row}>
                        <div className="pt-1 pe-1 justify-content-end d-flex">
                           {prompts.length > 1 ?
                              <>
                                 {generate_status ?
                                    <ImCross className={styles.disable_delete_row_btn} fontSize={20} />
                                    :
                                    <ImCross className={styles.delete_row_btn} fontSize={20} onClick={() => handleDeleteRow(index)} />
                                 }
                              </>
                              :
                              <div className="pt-3" />
                           }
                        </div>

                        {/* Input Textfield */}
                        <Col xs={12} md={3} className="pb-2">
                           <Col className="fs-5 text-light" xs={12} md={12}>{translate('table.input.title', language)}</Col>
                           <div className="pt-2">
                              <textarea
                                 placeholder={translate(`placeholder.${featureName}`, language)}
                                 className={styles.page_prompt_area_textfield}
                                 value={input}
                                 onChange={(event) => handleInputTextChange(index, event)}
                                 required
                              />
                           </div>
                        </Col>
                        {/* Type Dropdown */}
                        <Col className="pb-2">
                           <Col className="fs-5 text-light" xs={12} md={9}>{translate('table.type.title', language)}</Col>
                           <Col sm className="pt-2">
                              <select
                                 className={styles.page_prompt_area_combobox}
                                 value={tone_id}
                                 onChange={(event) => handleTypeChange(index, event)}
                              // required
                              >
                                 {tones.map((item: Tones) => (
                                    <option key={item.id} value={item.id}>
                                       {item.tone_name}
                                    </option>
                                 ))}
                              </select>


                           </Col>
                        </Col>
                        {/* Message */}
                        <Col xs={12} md={3} lg={4} xl={5} className="pb-2">
                           <Col className="fs-5 text-light" xs={12} md={6}>{translate('table.massage.title', language)}</Col>
                           <div className="pt-1">
                              {/* If message length is 0, show "No generated message..." */}
                              {message.length === 0 && (
                                 <span className="text-white-50">{translate("table.no_message", language)}</span>
                              )}

                              {/* If there is a message */}
                              {message.length > 0 && (
                                 <Container fluid={true} className="">
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
                              <GenerateButton index={index} generate_status={generate_status} />
                           </div>
                        </div>
                     </Row>
                  ))}
                  <Container className={styles.page_prompt_area_addrow}>
                     <button className={styles.page_prompt_add_new_row_button} onClick={handleAddNewRow}>
                        <div className="d-flex pe-0">
                           <div className=""> {translate("button.newRow", language)} </div>
                           <div className="ps-2">
                              <IoMdAddCircleOutline size={25} />
                           </div>
                        </div>
                     </button>
                  </Container>
               </Container>

            </Container>
         </Container>
      </div>
   );
};

export default TableComponents
