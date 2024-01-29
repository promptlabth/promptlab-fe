import React, { useEffect, useState } from 'react';
import { Col, Modal, Offcanvas, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import styles from './styles.module.css';
import { FaFacebookF, FaInfoCircle } from "react-icons/fa";
import { IoIosArrowForward, IoMdInformationCircle } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GenerateMessage, ImproveCaptionsRequest, Prompt } from '@/models/promptMessages';
import { AiFillFacebook, AiOutlineSend } from 'react-icons/ai';
import { RxAvatar } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

import { translate } from '@/languages/language';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { Noto_Sans_Thai } from 'next/font/google';
import { useUserContext } from '@/contexts/UserContext';
import { generateImproveCaption } from '@/api/GenerateMessageAPI';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { BsFacebook } from 'react-icons/bs';

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

const GenerateButton = ({ prompt, setPrompt }: { prompt: Prompt, setPrompt: any }) => {
   const userContext = useUserContext();
   const { language } = useLanguage();
   const handleGenerateMessage = async () => {
      try {
         if (userContext?.remainingMessage == 0 || userContext?.user === null) {
            return
         }

         setPrompt({ ...prompt, isGenerating: true })
         const { input, } = prompt;
         const data: ImproveCaptionsRequest = {
            input_message: input,
            language_id:
               language === "th" ? 1 :
                  language === "eng" ? 2 :
                     language === "id" ? 3 : 2
         }
         const result = await generateImproveCaption(data)
         if (result) {
            const message = result.reply
            userContext?.updateRemainingMessage();
            setPrompt({ ...prompt, message: message, isGenerating: false })
         }
      } catch {
         setPrompt({ ...prompt, message: "Error. Please try again", isGenerating: false })
      }
   }

   return (
      <>
         {prompt.isGenerating ?
            <button
               data-bs-toggle={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "modal" : ""}`}
               data-bs-target={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "#Modal" : ""}`}
               className={styles.page_prompt_loading_generate_btn}
               type="button"
               disabled={true}
               style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
            >
               <div className="d-flex">
                  <div className="pe-2 ps-2">
                     <div className="spinner-border spinner-border-sm"></div>
                  </div>
                  <div className="pe-2"> กำลังสร้างข้อความ </div>
               </div>
            </button>
            :
            <button
               className={styles.page_prompt_generate_btn}
               type="button"
               onClick={handleGenerateMessage}
               style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
            >
               <div className="d-flex pe-2 ps-2">
                  <div className="pe-2">
                     <AiOutlineSend size={20} />
                  </div>
                  <div> {translate("button.genarate", language)} </div>
               </div>
            </button>
         }
      </>

   )
}

const GenerateCountBox = ({ language }: { language: Language }) => {
   const userContext = useUserContext();

   return (
      <div className={`${styles.generate_count_layout} text-white`}>
         <AiOutlineSend className="text-white me-2" size={20} />
         {userContext?.remainingMessage! < 0 ? 0 : userContext?.remainingMessage}&#47;{userContext?.user?.maxMessages}
         <OverlayTrigger
            placement={'top'}
            delay={{ show: 150, hide: 250 }}
            trigger={['hover', 'focus']}
            overlay={
               <Tooltip className={`${noto_sans_thai.className}`} id="generate-count-tooltip" >
                  {translate("table.messageInMonth1", language)} 4999 {translate("table.messageInMonthUnit", language)}!
               </Tooltip>
            }
         >
            <a href="" onClick={(e) => e.preventDefault()}>
               <IoMdInformationCircle className="text-white ms-2" size={22} />
            </a>
         </OverlayTrigger>
      </div>
   )
}

const FbPostGeneratedComponent = () => {
   const { language } = useLanguage();
   const userContext = useUserContext();
   const [prompt, setPrompt] = useState<Prompt>();
   const [showDrawer, setShowDrawer] = useState(false);
   const [windowWidth, setWindowWidth] = useState(0);
   const mockMessage = `
   คลิปล่าสุดของ พี่จอง-คัลแลน ได้ปล่อยออกมาเมื่อ 2 วันก่อน โดยคลิปนี้เป็นทริปที่ทั้งสองไปเที่ยว จ.ตาก ในคลิปทั้งสองต้องนั่งรถสองแถวจากตัวเมืองตากไป อ.อุ้มผาง และก็มีเพื่อนร่วมทางด้วยอีกคนหนึ่งเป็นหญิงสาวที่ชื่อจีด้วยการที่การไปอุ้มผางกินเวลาถึง 4 ชั่วโมง แล้วถนนก็เป็นบนเขามีโค้งเยอะ ทําพี่จองเมารถจนหน้าซีดเลย ก่อนที่สาวจีจะยื่นยาแก้เมารถให้พี่จอง ทําพี่จอง-คัลแลน ขอบคุณกันยกใหญ่หลังคลิปปล่อยออกมา แฟนคลับ คัลแลน-พี่จอง ได้รู้สึกถึงความมีน้ําใจ ความน่ารัก ความอ่อนโยนมีมารยาทของจี จนออกมาชื่นชมกันอย่างล้นหลามเลยและล่าสุดทางแฟนคลับก็ได้เจอบัญชีติ๊กต็อกของจีมาชื่อว่า jiranan.06 พบว่าจีเป็นสาวเชื้อสายม้งที่บ้านอยู่ อ.อุ้มผาง ทําให้ตอนนี้บัญชีติ๊กต็อกของเจ้าตัวไวรัลขึ้นมาอย่างแรงนอกจากนี้เจ้าตัวยังบอกว่า ก่อนหน้านี้ไม่รู้จักกับ พี่จอง-คัลแลน แต่ตอนที่ได้นั่งรถด้วยกัน 4 ชั่วโมงก็รู้สึกว่าเป็นคนที่ตล#เหมียวเฟนเดอร์จนกระทั่งคลิปออกมาแล้วเพื่อนส่งมาให้ดูถึงรู้ว่าเป็น คัลแลน-พี่จอง ที่กําลังดังตอนนี้
   `

   const toggleDrawer = () => {
      setShowDrawer(!showDrawer);
   };

   const FbPostGeneratedDrawer = () => {

      return (
         <div className={`${noto_sans_thai.className} d-flex  justify-content-end position-relative`}>
            <button
               className={showDrawer ? styles.offcanvas_btn_box_active : styles.offcanvas_btn_box}
               onClick={toggleDrawer}
            >
               {showDrawer ? <IoIosArrowBack className='mb-2 mt-2  text-white' /> : <IoIosArrowForward className='mb-2 mt-2 text-white' />}
               <b className='text-white'>  สร้างข้อความจากโพส </b>
               <FaFacebookF size={30} style={{ rotate: "-90deg" }} />
            </button>

            <Offcanvas show={showDrawer} placement={"end"} onHide={toggleDrawer} style={{
               width: "700px",
               background: "rgba(255, 255, 255, 0.85)"
            }}>
               {userContext?.user === null &&

                  <div
                     className='d-flex align-items-center justify-content-center'
                     style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, pointerEvents: "auto", background: "rgba(0, 0, 0, 0.8)" }}> /
                     <h2 className='text-white fw-bold'>
                        กรุณาเข้าสู่ระบบก่อนใช้ Feature นี้
                     </h2>
                  </div>
               }
               <Offcanvas.Body className={`pt-1 px-5 ${noto_sans_thai.className}`}>
                  <div className={styles.facebook_post_container}>
                     <div className='d-flex px-3 pt-2'>
                        <RxAvatar size={40} className='text-white' />
                        <div className='text-white fw-bold ps-2' style={{ paddingTop: "0.4rem", }}>เพจทดสอบ</div>
                     </div>
                     <div className='text-white p-3'>
                        {mockMessage}

                     </div>
                  </div>
                  <div className='d-flex justify-content-center'>
                     <GenerateButton
                        prompt={prompt!}
                        setPrompt={setPrompt}
                     />
                  </div>
                  {userContext?.user &&
                     <div className='d-flex justify-content-end'>
                        <GenerateCountBox language={language} />
                     </div>
                  }
                  <div className={styles.prompt_result_area}>
                     <div className='d-flex px-3 pt-2'>
                        <img
                           className={styles.avatar_icon}
                           src="/images/prompt_lab_logo.png"
                           alt="PromptLabLogo"
                        />
                        <div className='text-white fw-bold ps-2' style={{ paddingTop: "0.4rem", }}>Prompt lab</div>
                     </div>
                     <div className='text-white p-3'>
                        {prompt?.message.length === 0 ?
                           <span className="text-white-50">{translate("table.no_message", language)}</span>
                           :
                           <span>{prompt?.message}</span>
                        }
                     </div>
                  </div>

               </Offcanvas.Body>
            </Offcanvas>
         </div>
      )
   }

   const FbPostGeneratedModal = () => {
      return (
         <>
            {!showDrawer &&
               <div className={`${noto_sans_thai.className}  d-flex justify-content-end position-relative`}>
                  <button
                     className={styles.modal_toggle_btn}
                     onClick={toggleDrawer}
                  >
                     <IoIosArrowForward className='mb-2 mt-2 text-white' />
                     <b className='text-white'>  สร้างข้อความจากโพส </b>
                     <FaFacebookF size={30} style={{ rotate: "-90deg" }} />
                  </button>
               </div>
            }

            <Modal style={{ paddingTop: "3rem" }} className="" size='lg' contentClassName={styles.fb_post_generated_modal} show={showDrawer} onHide={toggleDrawer}>


               <div>
                  <button
                     className={`${styles.modal_toggle_btn_active}`}
                     onClick={toggleDrawer}
                  >
                     <FaFacebookF />
                     <b className='text-white'>  สร้างข้อความจากโพส </b>
                     <IoIosArrowUp className='mb-2 mt-2 text-white' />
                  </button>
               </div>
               <Modal.Body className={noto_sans_thai.className}  >
                  {userContext?.user === null &&

                     <div
                        className='d-flex align-items-center justify-content-center'
                        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, pointerEvents: "auto", background: "rgba(0, 0, 0, 0.8)" }}> /
                        <h2 className='text-white fw-bold'>
                           กรุณาเข้าสู่ระบบก่อนใช้ Feature นี้
                        </h2>
                     </div>
                  }
                  <div className="d-flex justify-content-end">
                     <IoClose onClick={toggleDrawer} size={30} />
                  </div>
                  <div className={styles.facebook_post_container} style={{ marginTop: "20px" }}>
                     <div className='d-flex px-3'>
                        <RxAvatar size={40} className='text-white' />
                        <div className='text-white fw-bold ps-2' style={{ paddingTop: "0.4rem", }}>เพจทดสอบ</div>
                     </div>
                     <div className='text-white p-3'>
                        {mockMessage}

                     </div>
                  </div>
                  <div className='d-flex justify-content-center'>
                     <GenerateButton
                        prompt={prompt!}
                        setPrompt={setPrompt}
                     />
                  </div>
                  {userContext?.user &&
                     <div className='pt-3 d-flex justify-content-end'>
                        <GenerateCountBox language={language} />
                     </div>
                  }
                  <div className={styles.prompt_result_area}>
                     <div className='d-flex px-3 pt-2'>
                        <img
                           className={styles.avatar_icon}
                           src="/images/prompt_lab_logo.png"
                           alt="PromptLabLogo"
                        />
                        <div className='text-white fw-bold ps-2' style={{ paddingTop: "0.4rem", }}>Prompt lab</div>
                     </div>
                     <div className='text-white p-3'>
                        {prompt?.message.length === 0 ?
                           <span className="text-white-50">{translate("table.no_message", language)}</span>
                           :
                           <span>{prompt?.message}</span>
                        }
                     </div>
                  </div>

               </Modal.Body>
            </Modal>
         </>
      )
   }

   useEffect(() => {
      setPrompt({
         input: mockMessage,
         tone_id: 1,
         message: "",
         isGenerating: false
      })

      const handleResize = () => {
         setWindowWidth(window.innerWidth);
      };

      if (typeof window !== "undefined") {
         handleResize();
         window.addEventListener("resize", handleResize);

         return () => {
            window.removeEventListener("resize", handleResize);
         };
      }
   }, [])


   return (
      <>
         {windowWidth >= 830 ?
            FbPostGeneratedDrawer()
            :
            FbPostGeneratedModal()
         }
      </>


   )
}
export default FbPostGeneratedComponent
