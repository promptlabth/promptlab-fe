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

interface MockPageData {
   pageName: string;
   imageUrl: string;
   postMessage: string;
}

const mockPagedate: MockPageData[] = [
   {
      pageName: "Prompt Lab",
      imageUrl: "https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/365389074_188343804240037_4562066473151931163_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHybvSSIsYwCb_gVI4qDA0-YtUcsGg5U-di1RywaDlT50NxcJ4-HWxUuzYLcTXCI2ZWLKP-kq5RqpUs5O2MEH_K&_nc_ohc=IJe_Kf2fkasAX_ud_7Z&_nc_ht=scontent.fnak3-1.fna&oh=00_AfDMfhossMcVcyOfjFFHr7YLsRstDug5xFjIu73BhwdE5g&oe=65BCB6FE",
      "postMessage": "เป็นเว็บไซต์ที่พัฒนาขึ้นโดยคนไทย ทำขึ้นมาเพื่อช่วยคิดแคปชันขายของ ออกไอเดียทำคอนเทนต์ คิดบทพูดเปิดคลิป ช่วยเขียนร่างบทความ หรือเขียนร่างสคริปต์สั้น ๆ"
   },
   {
      pageName: "Metanet Corporation",
      imageUrl: "https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/334372853_101727972861347_5880736532289895007_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEmR3vuUr4tx50xmEss-zGbgLiPmujrqYaAuI-a6Oupho24hPK8TjZIhvvxGuvfOvevdcUfdQLlKZwIOTM4CPFV&_nc_ohc=uMMrFKjOOxMAX8H8iu7&_nc_ht=scontent.fnak3-1.fna&oh=00_AfCtuQUBYamcGsxWQK1fzdbgqdQi5epAdUH6deQhqwvxeA&oe=65BCFDB5",
      postMessage: `สวัสดีค่ะทุกท่าน👋 วันนี้มีข้อมูลดีๆ ที่อยากจะแชร์ให้ทุกคนรู้กันค่ะ นั่นคือ Consensus AI ซึ่งเป็นแพลตฟอร์มการวิจัย AI ที่จะช่วยทุกคนค้นหาและเข้าใจงานวิจัยได้อย่างง่ายดาย ด้วยเทคโนโลยี AI ที่สามารถวิเคราะห์งานวิจัยจำนวนมากและสรุปผลลัพธ์ที่เป็นประโยชน์ ให้ทุกคนได้รับรู้ค่ะ🧠📚
      Consensus AI มีฟีเจอร์อะไรบ้างนะคะ? มาดูกันค่ะ🔍
      📍การค้นหาที่มีประสิทธิภาพ: ทำให้คุณค้นหางานวิจัยได้อย่างรวดเร็วและง่ายดาย
      📍การสรุปงานวิจัย: ทำให้คุณเข้าใจงานวิจัยทางวิทยาศาสตร์ได้ง่ายขึ้น
      📍การวิเคราะห์ข้อมูลงานวิจัย: ช่วยระบุแนวโน้มและข้อค้นพบที่สำคัญในงานวิจัย
      ไม่ว่าคุณจะเป็นใคร ใช้หาข้อมูลวิจัยในเรื่องอะไร Consensus AI ก็เหมาะสมและมีศักยภาพสำหรับทุกคนค่ะ💪
      แล้วคุณคิดว่า Consensus AI จะช่วยคุณได้อย่างไรบ้างคะ? แชร์ความคิดเห็นของคุณมาดูกันค่ะ😊👇
      #METANET #TechRevolution #MetaverseExploration #WebsiteInnovation #UXUIEvolution #TechTrends
      #DigitalTransformation #TechSavvy #MetaverseExperience #WebsiteDesign #UXUIEnhancement`
   },
   {
      pageName: "Hoshimura Himawari CH",
      imageUrl: "https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/280025257_162949762850216_5657307016804382337_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEQyW5KwA7Ul5ClKAPrHfD7yXTKbtAgYU7JdMpu0CBhTlVQZQVGlm3WlyapQTHLl3jubK-y5_TmzKzGqidIRwG9&_nc_ohc=gPo3QjA9pekAX9gnJeR&_nc_ht=scontent.fnak3-1.fna&oh=00_AfBHegJLj1hOCzmYbyh-YhVO0ohb0iDX9ho3HHIqA-Llyw&oe=65BDFE54",
      postMessage: `ไปแอบแก้บัคมาทั้งบ่าย ในที่สุดก็ได้เวลา Deploy แล้ววว
      อันนี้น่าจะบรรเทิงกว่า Coding แน่ๆเลยค่า
      น่าจะต้องทำ Pipeline เผื่อไว้ด้วยสินะ
      ปล.ยังขาดส่วน Upload ฝั่ง FrontEnd อีกนิดนึง
      #VtuberTH #VtuberTH #VtuberOwl #himawariwhiteowllive`
   },
   {
      pageName: "FMTH Community",
      imageUrl: "https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/351306604_264506272750805_5305383211025831334_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeF03ee9a8P7m-3NqRSJslDVWX1iABzBvyVZfWIAHMG_JWE5d9b8i8M180bcxe2Tv3v9RZ9V8YlOcOLNomYvqkF4&_nc_ohc=SIRrMcVnl88AX8pQGb_&_nc_ht=scontent.fnak3-1.fna&oh=00_AfCZ7s-o9cBCMpZUf5DlWimfuRlo6n-MdukXvOn70Y0qEA&oe=65BDF320",
      postMessage: `📝 [Tactics] #JoshDaly Mourinho's INSANE 4-3-3 Wins The QUADRUPLE! #FM24 [24.2.1] แผน 433 สุดเทพของจ่ามู 💙🇵🇹
      .
      ดาวน์โหลด 📤 : https://www.fmscout.com/c-fm24-tactics.html?id=10733
      .
      วิธีลง 📥 : นำไฟล์ไว้ที่ Sports Interactive\Football Manager 2024\tactics
      .
      ตัวอย่างแผน 📺 : https://www.youtube.com/watch?v=2G_1hhA5YFs
      เครดิต🙏 : JoshDaly
      🕹⚽️[Ad] : สนใจลงไฟล์เสริมกราฟฟิกต่างๆ ทักinbox ของเพจ  หรือแอดไลน์มาที่ @711yyzwl (กรณีทักมาแอดไม่ตอบพิมสนไว้ในโพสต์นี้ได้เลย) 📩🗳 #FMTH`
   },
   {
      pageName: "THE STANDARD",
      imageUrl: "https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/357120746_600094418916572_1657859934535396219_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeH9rdQJp0XgcMgRQOU8X3QDOnwD9vlPWWk6fAP2-U9ZaXFh4KjqhsyA31P0NQLhUmKxo9G-c1j1ZcVOSb1tx2ub&_nc_ohc=9jCB-ChRRRMAX_LC0pv&_nc_ht=scontent.fnak3-1.fna&oh=00_AfAk2getEXGddfgKek2mEvhTQxbLGlT0MhTxMSAtEU-6RQ&oe=65BE2D2F",
      postMessage: `เดวิด เบ็คแฮม เยือนเมืองไทย!
      .
      วันนี้ (30 มกราคม) เดวิด เบ็คแฮม ตำนานนักฟุตบอลชื่อดัง และประธานสโมสรอินเตอร์ ไมอามี ในศึกเมเจอร์ลีกซอกเกอร์ สหรัฐอเมริกา เดินทางมายังประเทศไทย เพื่อร่วมงาน THE LEGEND OF PREDATOR ณ อาดิดาสแบรนด์เซ็นเตอร์ ชั้น 3 เซ็นทรัลเวิลด์ ท่ามกลางแฟนๆ ชาวไทยที่มารอให้การต้อนรับอย่างเนืองแน่น
      .
      #TheStandardNews`
   }
]
// random data from mockPagedate
const randomPageData: MockPageData = mockPagedate[Math.floor(Math.random() * mockPagedate.length)];

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
                        <img src={randomPageData.imageUrl} className="rounded-circle" style={{width: "50px"}}></img>
                        <div className='text-white fw-bold ps-2' style={{ paddingTop: "0.4rem", }}>{randomPageData.pageName}</div>
                     </div>
                     <div className='text-white p-3'>
                        {randomPageData.postMessage}

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
                     <img src={randomPageData.imageUrl} className="rounded-circle" style={{width: "50px"}}></img>
                        <div className='text-white fw-bold ps-2' style={{ paddingTop: "0.4rem", }}>{randomPageData.pageName}</div>
                     </div>
                     <div className='text-white p-3'>
                        {randomPageData.postMessage}

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
         input: randomPageData.postMessage,
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
