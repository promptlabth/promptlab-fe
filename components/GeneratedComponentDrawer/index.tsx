import React, { useEffect, useState } from 'react';
import { Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './styles.module.css';
import { FaFacebookF } from "react-icons/fa";
import { IoIosArrowForward, IoMdInformationCircle } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GenerateMessage, Prompt } from '@/models/promptMessages';
import { AiOutlineSend } from 'react-icons/ai';
import { RxAvatar } from "react-icons/rx";

import { translate } from '@/languages/language';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { Noto_Sans_Thai } from 'next/font/google';
import { useUserContext } from '@/contexts/UserContext';
import { generateMessageWithUser } from '@/api/GenerateMessageAPI';

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

const GenerateButton = ({ prompt, setPrompt }: { prompt: Prompt, setPrompt: any }) => {
   const userContext = useUserContext();
   const handleGenerateMessage = async () => {
      try {
         if (userContext?.remainingMessage == 0 || userContext?.user === null) {
            return
         }
         
         setPrompt({...prompt, isGenerating: true})
         const { input, tone_id } = prompt;
         const data: GenerateMessage = {
            input_message: input,
            tone_id: tone_id,
            feature_id: 1,
         }
         const result = await generateMessageWithUser(data)
         if (result) {
            const message = result.reply
            userContext?.updateRemainingMessage();
            setPrompt({...prompt, message: message, isGenerating: false})
         }
      } catch {
         setPrompt({...prompt, message: "Error. Please try again", isGenerating: false})
      }
   }

   return (
      <>
         {prompt.isGenerating ?
            <button
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
                  <div> สร้างข้อความ </div>
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
const GeneratedCompomentDrawer = () => {
   const userContext = useUserContext();
   const { language } = useLanguage();
   const [prompt, setPrompt] = useState<Prompt>();
   const [showDrawer, setShowDrawer] = useState(false);
   const mockMessage = `
      ยาสีฟัน AAA: รอยยิ้มสดใส สุขภาพเหงือกแข็งแรง
      ยาสีฟัน AAA เป็นยาสีฟันสูตรพิเศษที่ช่วยให้ฟันขาวสะอาด ลมหายใจสดชื่น และเหงือกแข็งแรง ด้วยส่วนผสมของฟลูออไรด์ที่ช่วยป้องกันฟันผุ และสารสกัดจากธรรมชาติที่ช่วยลดการสะสมของแบคทีเรียในช่องปาก
      ยาสีฟัน AAA ช่วยให้คุณมีสุขภาพเหงือกที่แข็งแรง ลดปัญหาเลือดออกและการอักเสบของเหงือก ช่วยให้ฟันของคุณแข็งแรงและสุขภาพดี พร้อมทั้งรอยยิ้มที่สดใส เปล่งประกาย
      ใช้ยาสีฟัน AAA เป็นประจำทุกเช้าและเย็น เพื่อให้คุณมีสุขภาพช่องปากที่ดี แถมยังมีรอยยิ้มที่สวยงามสดใสอีกด้วย ลองเลย แล้วคุณจะรู้ว่ายาสีฟัน AAA ดีจริง! ซื้อยาสีฟัน AAA ได้แล้ววันนี้ที่ร้านค้าชั้นนำทั่วไป
      #ยาสีฟันAAA #ฟันขาว #ลมหายใจสดชื่น #เหงือกแข็งแรง #สุขภาพช่องปากดี #รอยยิ้มสวย #มั่นใจเต็มร้อย
   `
   const toggleDrawer = () => {
      setShowDrawer(!showDrawer);
   };

   useEffect(() => {
      setPrompt({
         input: mockMessage,
         tone_id: 1,
         message: "",
         isGenerating: false
      })
   }, [])


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

            {/* <Offcanvas.Header closeButton>
               <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header> */}

            <Offcanvas.Body className={`pt-1 px-5 ${noto_sans_thai.className}`}>

               <div className={styles.facebook_post_container}>
                  <div className='d-flex px-3 pt-2'>
                     <RxAvatar size={40} className='text-white' />
                     {/* <img
                        className={styles.avatar_icon}
                        src="/images/prompt_lab_logo.png"
                        alt="PromptLabLogo"
                     /> */}
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
               <div className='d-flex justify-content-end'>
                  <GenerateCountBox language={language} />
               </div>
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
export default GeneratedCompomentDrawer
