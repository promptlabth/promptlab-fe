import React, { useState } from 'react';
import { Button, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './styles.module.css';
import { FaFacebookF } from "react-icons/fa";
import { IoIosArrowForward, IoMdInformationCircle } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Prompt } from '@/models/promptMessages';
import { AiOutlineSend } from 'react-icons/ai';
import { translate } from '@/languages/language';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { Noto_Sans_Thai } from 'next/font/google';

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })
const GenerateButton = () => {
   return (
      <button
         // data-bs-toggle={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "modal" : ""}`}
         // data-bs-target={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "#Modal" : ""}`}
         className={styles.page_prompt_generate_btn}
         type="button"
         // onClick={handleClick}
         style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
      >
         <div className="d-flex pe-2 ps-2">
            <div className="pe-2">
               <AiOutlineSend size={20} />
            </div>
            <div> สร้างข้อความ </div>
         </div>
      </button>
   )
}

const GenerateCountBox = ({ language }: { language: Language }) => {
   return (
      <div className={`${styles.generate_count_layout} text-white`}>
         <AiOutlineSend className="text-white me-2" size={20} />
         70/200
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
   const { language } = useLanguage();
   const [prompt, setPrompt] = useState<Prompt>();
   const [showDrawer, setShowDrawer] = useState(false);

   const toggleDrawer = () => {
      setShowDrawer(!showDrawer);
   };


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

         <Offcanvas show={showDrawer} placement={"end"} onHide={toggleDrawer} style={{ width: "700px" }}>

            {/* <Offcanvas.Header closeButton>
               <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header> */}

            <Offcanvas.Body className="pt-1 px-5">
               
               <div className={styles.facebook_post_container}>
                  <div className='d-flex px-3 pt-2'>
                     <img
                        className={styles.avatar_icon}
                        src="/images/prompt_lab_logo.png"
                        alt="PromptLabLogo"
                     />
                     <div className='text-white fw-bold ps-2' style={{ paddingTop: "0.4rem", }}>Prompt lab</div>
                  </div>
                  <div className='text-white p-3'>
                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                  </div>
               </div>
               <div className='d-flex justify-content-center'>
                  <GenerateButton />
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
                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                  </div>
               </div>

            </Offcanvas.Body>
         </Offcanvas>
      </div>

   )
}
export default GeneratedCompomentDrawer
