import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillClipboardFill, BsFillClipboardCheckFill } from "react-icons/bs";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/languages/language";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { Noto_Sans_Thai } from "next/font/google";
import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleRight } from "react-icons/vsc";
import { PromptMessage } from "@/models";
import { getMessageHistoryWithUserId } from "@/api/GetMessageHistory";
import { GetTonesByID } from "@/api/ToneAPI";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });

function formatDate(date_time: string): string {
   const date = new Date(date_time);
   return date.toUTCString()
}
 

const History = () => {
   const [prompts, setPrompts] = useState<PromptMessage[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
   const promptsPerPage = 5; // Number of prompts to display per page 
   const { language } = useLanguage();

   const getMessage = async () => {
      const result = await getMessageHistoryWithUserId();
      if (result) {
         const updatedPrompts = await Promise.all(
            result.map(async (prompt : PromptMessage) => ({
               ...prompt,
               tone_name: await getToneName(prompt.tone_id),
            }))
         );
         console.log(updatedPrompts)
         setPrompts(updatedPrompts);
      }
   }
   const getToneName = async (tone_id: number) => {
      const tone = await GetTonesByID(tone_id)
      return tone.tone_name
   }

   const CopyToClipboardButton = ({ message }: { message: string }) => {
      const [isCopied, setIsCopied] = useState(false);

      const renderTooltip = (props: any) => (
         <Tooltip id="button-tooltip" {...props}>
            {isCopied ? (
               <span className="fs-6"> Copied </span>
            ) : (
               <span className="fs-6"> Copy to Clipboard </span>
            )}
         </Tooltip>
      );

      const handleCopy = () => {
         setIsCopied(true);
      };

      return (
         <OverlayTrigger
            placement="top"
            delay={{ show: 50, hide: 50 }}
            overlay={renderTooltip}
         >
            <CopyToClipboard text={message} onCopy={handleCopy}>
               <div className="">
                  {!isCopied ? (
                     <button type="button" className="btn btn-secondary btn-sm">
                        <BsFillClipboardFill />
                     </button>
                  ) : (
                     <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ background: "#16942C" }}
                        onMouseLeave={() => {
                           setTimeout(() => {
                              setIsCopied(false);
                           }, 1000);
                        }}
                     >
                        <BsFillClipboardCheckFill />
                     </button>
                  )}
               </div>
            </CopyToClipboard>
         </OverlayTrigger>
      );
   };

   // Calculate the index range of prompts to display for the current page
   const indexOfLastPrompt = currentPage * promptsPerPage;
   const indexOfFirstPrompt = indexOfLastPrompt - promptsPerPage;
   const currentPrompts = prompts.slice(indexOfFirstPrompt, indexOfLastPrompt);
   const totalPages = Math.ceil(prompts.length / promptsPerPage);
   const Pagination = () => {
      return (
         <div className={`${styles.pagination} -flex justify-content-end pb-2`}>
            <button
               className={`${currentPage === 1 ? styles.pagination_item_disable : styles.pagination_item}`}
               disabled={currentPage === 1}
               onClick={() => setCurrentPage(currentPage - 1)}
            >
               <VscTriangleLeft/>
            </button>
            {Array.from({ length: Math.ceil(prompts.length / promptsPerPage) }, (_, index) => (
               <a
                  key={index}
                  className={`${styles.pagination_page_number} ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
               >
                  {index + 1}
               </a>
            ))}
            <button
               className={`${currentPage === totalPages ? styles.pagination_item_disable : styles.pagination_item}`}
               disabled={currentPage === totalPages}
               onClick={() => setCurrentPage(currentPage + 1)}
            >
               <VscTriangleRight />
            </button>
         </div>
      )
   }
   useEffect(() => {
      getMessage();
   }, []);

   return (
      <div className={noto_sans_thai.className}>
         <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
            <Container className={styles.page_container}>
               <figure className="text-center pb-1 pt-3 text-light">
                  <h2>
                     <b>{translate("history", language)}</b>
                  </h2>
               </figure>

               <Container fluid={true} className={styles.page_prompt_area}>
                  <Pagination />
                  {currentPrompts.map(
                     ({ input_message, result_message, tone_name, date_time, }, index) => (
                        <Row key={index} className={styles.page_prompt_area_row}>
                           <Col className="text-light">
                              <div className="fs-5 text-light"> {index + 1}</div>
                           </Col>
                           <Col xs={12} md={2} lg={2} className="pb-2 ">
                              <Col className="fs-5 text-light" xs={12} md={12}>
                                 <b> {translate("table.input.title", language)}</b>
                              </Col>
                              <div className={styles.page_prompt_area_textfield}>
                                 {input_message}
                              </div>
                           </Col>
                           <Col xs={12} md={2} lg={2} className="pb-2 ">
                              <Col className="fs-5 text-light" xs={12} md={6} lg={12}>
                                 <b> {translate("table.type.title", language)}</b>
                              </Col>
                              <Col sm className="pt-2">
                                 <div className={styles.page_prompt_area_combobox}> {tone_name}</div>
                              </Col>
                           </Col>
                           <Col xs={12} md={4} lg={5} xl={5} className="pb-2">
                              <Col className="fs-5 text-light" xs={12} md={6} lg={12}>
                                 <b> {translate("table.massage.title", language)}</b>
                              </Col>
                              <div className="pt-1 text-light">
                                 <Container fluid={true} className="">
                                    <Row>
                                       <Col className="d-flex p-0 justify-content-end">
                                          <CopyToClipboardButton message={result_message} />
                                       </Col>
                                       <Col xs={12} className="text-light p-0 mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                                          {result_message}
                                       </Col>
                                    </Row>
                                 </Container>
                              </div>
                           </Col>
                           <Col xs={12} md={3} lg={2} xl={2} className="pb-2">
                              <Col className="fs-5 text-light d-flex justify-content-between align-items-center">
                                 <b> {translate("createAt", language)}</b>
                              </Col>
                              <div className="text-light"> {formatDate(date_time.toString())}</div>
                           </Col>
                        </Row>
                     ))
                  }
                  <Pagination />
               </Container>
            </Container>
         </Container>
      </div>
   );
};

export default History;
