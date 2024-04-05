import { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillClipboardFill, BsFillClipboardCheckFill, BsFacebook } from 'react-icons/bs';
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineSend, AiFillVideoCamera } from 'react-icons/ai';
import { MdSell, MdOutlineArticle } from 'react-icons/md';
import { HiOutlineLightBulb } from 'react-icons/hi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaClosedCaptioning } from 'react-icons/fa';
import { Col, Container, Row } from "react-bootstrap";
import { generateMessageWithUser } from "@/api/GenerateMessageAPI";
import { ImCross } from 'react-icons/im';
import styles from "./styles.module.css";
import { Noto_Sans_Thai } from 'next/font/google'
import { Tones } from "@/models/tones";
import { useUserContext } from "@/contexts/UserContext";
import { features } from "@/constant";
import { usePathname } from 'next/navigation'
import { FcGoogle } from "react-icons/fc";
import { IoMdInformationCircle } from 'react-icons/io'
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { GenerateMessage, Prompt } from "@/models/promptMessages";
import { ListTones } from "@/api/ToneAPI";
import { useTranslation } from "next-i18next";
import { useText } from "@/contexts/WiseSightContext";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

// Define a Page configuration data type
// @Attribute
// -  titilePage : A string representing title of page
// -  titleDescription : A string representing page description, which describe what a page is.
// -  getPrompt: A function that takes an input string and a type string as parameters, and 
//    returns a generated message based on the provided prompt and language.
type pageConfig = {
   titlePage: string;
   titleDescription: string;
   prompt: (input: string, type: string) => string;
}

const CopyToClipboardButton = ({ message }: { message: string }) => {
   const [isCopied, setIsCopied] = useState(false);

   const renderTooltip = (props: any) => (
      <Tooltip id="button-tooltip" {...props}>
         {isCopied ? <span className="fs-6"> Copied </span> : <span className="fs-6"> Copy to Clipboard </span>}
      </Tooltip>
   );

   return (
      <OverlayTrigger
         placement="top"
         delay={{ show: 50, hide: 50 }}
         overlay={renderTooltip}
      >
         <CopyToClipboard text={message} onCopy={() => { setIsCopied(true) }}>
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


const GenerateComponent = (config: pageConfig) => {
   const [prompts, setPrompts] = useState<Prompt[]>([]);
   const [tones, setTones] = useState<Tones[]>([]);
   const userContext = useUserContext()
   const pathname = usePathname()
   const featureName = `${pathname.slice(1)}`
   const { t, i18n } = useTranslation()
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

   const GenerateButton = ({ index, isGenerating }: { index: number, isGenerating: boolean }) => {
      const handleClick = () => {
         if (userContext?.user != null && userContext?.remainingMessage > 0) {
            setPrompts((prevPrompts) => {
               const updatedPrompts = [...prevPrompts];
               updatedPrompts[index] = {
                  ...updatedPrompts[index],
                  isGenerating: true,
               };
               return updatedPrompts;
            });
            handleGenerateMessage(index);
         }
      };

      return (
         <>
            <div
               className={`modal fade ${noto_sans_thai.className} `}
               id="Modal"
               tabIndex={-1}
               aria-labelledby="loginModallLabel"
               aria-hidden="true"
            >

               <div className={`modal-dialog modal-dialog-centered`}>
                  <div className={`modal-content`}>
                     <div className={`modal-body text-center mb-4`}>
                        <div className={`text-end`}>
                           <button
                              type="button"
                              className={`btn-close`}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                           ></button>
                        </div>
                        {userContext?.user == null &&
                           <>
                              <h4 className="mb-4">{t("modal.pleaseLoginBeforeGenerate")}</h4>
                              <Row className="row">
                                 <Col className="d-flex flex-column align-items-center">
                                    <button className={` mb-3 ${styles.btn}`} onClick={() => { userContext?.handleLogin("facebook") }}>
                                       <BsFacebook
                                          className="me-3 align-items-start"
                                          fontSize={20}
                                       ></BsFacebook>
                                       {t("login")}&nbsp;Facebook
                                    </button>
                                    <p style={{ color: "#c2c2c2" }}>- or -</p>
                                    <button className={`${styles.btn_google}`} onClick={() => { userContext?.handleLogin("gmail") }}>
                                       <FcGoogle className="me-3" fontSize={20}></FcGoogle>
                                       {t("login")}&nbsp;Google
                                    </button>
                                 </Col>
                              </Row>
                           </>
                        }
                        {userContext?.remainingMessage! <= 0 && userContext?.user &&
                           <>
                              <div className="p-2 pb-4">
                                 <FaInfoCircle size={110} />
                              </div>
                              <h4 className="mb-4 fw-bold"> {t("modal.noRemainingMessage.title")} </h4>
                              <Row className="row">
                                 <h5 className="text-black-50"> {t("modal.noRemainingMessage.description")} </h5>
                                 <h5 className="text-black-50"> {t("modal.noRemainingMessage.subscription")} </h5>

                                 <div className="ps-4 pe-4">
                                    <Row>
                                       <Col className="m-1" sm>
                                          <button
                                             className={`${styles.no_remaining_message_subscription_button}`}
                                             data-bs-dismiss="modal"
                                             aria-label="Close"
                                          >
                                             <Link href="/subscription" style={{ textDecoration: "none", color: "black" }}>
                                                {t("modal.noRemainingMessage.subscriptionButton")}
                                             </Link>
                                          </button>
                                       </Col>
                                       <Col className="m-1" sm>
                                          <button
                                             type="button"
                                             className={`${styles.no_remaining_message_close_button}`}
                                             data-bs-dismiss="modal"
                                             aria-label="Close"
                                          > Back </button>
                                       </Col>
                                    </Row>
                                 </div>
                              </Row>
                           </>
                        }
                     </div>
                  </div>
               </div>
            </div>


            {isGenerating ?
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
                  data-bs-toggle={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "modal" : ""}`}
                  data-bs-target={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "#Modal" : ""}`}
                  className={styles.page_prompt_generate_btn}
                  type="button"
                  onClick={handleClick}
                  style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
               >
                  <div className="d-flex pe-2 ps-2">
                     <div className="pe-2">
                        <AiOutlineSend size={20} />
                     </div>
                     <div className=""> {t("button.genarate")} </div>
                  </div>
               </button>
            }
         </>
      );
   };

   const handleGenerateMessage = async (index: number) => {
      const prompt = prompts[index];
      try {
         if (userContext?.remainingMessage == 0) {
            return
         }
         const { input, tone_id } = prompt;
         const data: GenerateMessage = {
            input_message: input,
            tone_id: tone_id,
            feature_id: features[config.titlePage],
         }

         const result = await generateMessageWithUser(data)
         if (result) {
            const message = result.reply
            const updatedPrompts = [...prompts];
            updatedPrompts[index] = { ...prompt, message: message, isGenerating: false };
            setPrompts(updatedPrompts);
            userContext?.updateRemainingMessage();
         }
      } catch {
         const updatedPrompts = [...prompts];
         updatedPrompts[index] = { ...prompts[index], message: "Error. Please try again", isGenerating: false };
         setPrompts(updatedPrompts);
      }
   }

   const [textAreaHeight, setTextAreaHeight] = useState('auto');

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

   const getTones = async () => {
      let language = i18n.language
      if (language == "en") {
         language = "eng"
      }
      const result = await ListTones(language);
      if (result) {
         setTones(result)
      }
   }

   useEffect(() => {
      if (prompts.length === 0) {
         handleAddNewRow();
      }
   }, [prompts]);

   useEffect(() => {
      getTones()
   }, [i18n.language])

   const { text } = useText();
   const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

   useEffect(() => {
    // Set the first prompt's input to the text value
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[0] = { ...updatedPrompts[0], input: text };
      return updatedPrompts;
    });

    const textArea = textAreaRef.current;
    // Adjust textarea height
    if (textArea) {
      textArea.style.height = 'auto'; // Reset height to recalculate
      textArea.style.height = `${textArea.scrollHeight}px`;
      textArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }


   }, [text]);

   return (
      <div className={noto_sans_thai.className}>
         <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
            <Container className={styles.page_container}>

               <figure className="text-center pt-4 pb-4 text-light">
                  <div className="pb-2"> {icons[pathname]} </div>
                  <blockquote className="blockquote">
                     <p className="display-4 fw-bold">{t(config.titlePage)}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                     {t(config.titleDescription)}
                  </figcaption>
               </figure>

               <Container fluid={true} className={styles.page_prompt_area}>
                  {userContext?.user &&

                     <div className={`pb-2 d-flex justify-content-end`}>
                        <div className={`d-flex ${styles.generate_count_layout}`}>
                           <AiOutlineSend className="text-white me-2" size={20} />
                           <div className="text-white">
                              {userContext?.remainingMessage! < 0 ? 0 : userContext?.remainingMessage}&#47;{userContext?.user?.maxMessages}
                           </div>

                           <OverlayTrigger
                              placement={'top'}
                              delay={{ show: 150, hide: 250 }}
                              trigger={['hover', 'focus']}
                              overlay={
                                 <Tooltip className={`${noto_sans_thai.className}`} id="generate-count-tooltip" >
                                    {t("table.messageInMonth1")} {userContext?.user?.maxMessages} {t("table.messageInMonthUnit")}!
                                 </Tooltip>
                              }
                           >
                              <a href="" onClick={(e) => e.preventDefault()}>
                                 <IoMdInformationCircle className="text-white ms-2" size={22} />
                              </a>
                           </OverlayTrigger>
                        </div>
                     </div>
                  }

                  {prompts.map(({ input, tone_id, message, isGenerating }, index) => (
                     <Row key={index} className={styles.page_prompt_area_row}>
                        <div className="pt-1 pe-1 justify-content-end d-flex">
                           {prompts.length > 1 ?
                              <>
                                 {isGenerating ?
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
                           <Col className="fs-5 text-light" xs={12} md={12}>{t('table.input.title')}</Col>
                           <div className="pt-2">
                              <textarea
                                 ref={textAreaRef}
                                 placeholder={t(`placeholder.${featureName}`)}
                                 className={styles.page_prompt_area_textfield}
                                 value={input}
                                 onChange={(event) => handleInputTextChange(index, event)}
                                 style={{ height: textAreaHeight }}
                                 required
                              />
                           </div>
                        </Col>
                        {/* Type Dropdown */}
                        <Col className="pb-2">
                           <Col className="fs-5 text-light" xs={12} md={9}>{t('table.type.title')}</Col>
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
                           <Col className="fs-5 text-light" xs={12} md={6}>{t('table.massage.title')}</Col>
                           <div className="pt-1">
                              {/* If message length is 0, show "No generated message..." */}
                              {message.length === 0 && (
                                 <span className="text-white-50">{t("table.no_message")}</span>
                              )}

                              {/* If there is a message */}
                              {message.length > 0 && (
                                 <Container fluid={true}>
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
                              <GenerateButton index={index} isGenerating={isGenerating} />
                           </div>
                        </div>
                     </Row>
                  ))}
                  <Container className={styles.page_prompt_area_addrow}>
                     <button className={styles.page_prompt_add_new_row_button} onClick={handleAddNewRow}>
                        <div className="d-flex pe-0">
                           <div className=""> {t("button.newRow")} </div>
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


export default GenerateComponent
