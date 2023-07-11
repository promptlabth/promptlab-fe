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
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });

function formatDate(date_time: Date): string {
   const date = new Date(date_time);
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   const seconds = String(date.getSeconds()).padStart(2, '0');
   const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

const History = () => {
   const [prompts, setPrompts] = useState<PromptMessage[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
   const promptsPerPage = 5; // Number of prompts to display per page 
   const { language } = useLanguage();

   const getMessage = async () => {
      const result = await getMessageHistoryWithUserId();
      if (result) {
         setPrompts(result)
      }
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

   console.log(currentPrompts)

   useEffect(() => {
      getMessage();
   }, []);

   return (
      <div className={noto_sans_thai.className}>
         <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
            <Container className={styles.page_container}>
               <figure className="text-center pb-1 pt-3 text-light">
                  <h2>
                     <b>ประวัติการสร้างข้อความ</b>
                  </h2>
               </figure>

               <Container fluid={true} className={styles.page_prompt_area}>
                  <div className={`${styles.pagination} -flex justify-content-end`}>
                     <a href="#" className={`${styles.pagination_item}`} onClick={() => setCurrentPage(currentPage - 1)}>
                        <VscTriangleLeft />
                     </a>
                     {Array.from({ length: Math.ceil(prompts.length / promptsPerPage) }, (_, index) => (
                        <a
                           key={index}
                           href="#"
                           className={`${styles.pagination_item} ${currentPage === index + 1 ? 'active' : ''}`}
                           onClick={() => setCurrentPage(index + 1)}
                        >
                           {index + 1}
                        </a>
                     ))}
                     <a href="#" className={styles.pagination_item} onClick={() => setCurrentPage(currentPage + 1)}>
                        <VscTriangleRight />
                     </a>
                  </div>
                  {currentPrompts.map(
                     ({ input_message, result_message, tone_id, date_time }, index) => (
                        <Row key={index} className={styles.page_prompt_area_row}>
                           <Col xs={1} md={1} lg={1} className="text-light">
                              <div className="fs-5 text-light"> {index + 1}</div>
                           </Col>
                           <Col xs={12} md={2} lg={2} className="pb-2 ">
                              <Col className="fs-5 text-light" xs={12} md={12}>
                                 {translate("table.input.title", language)}
                              </Col>
                              <div className="pt-2 text-light ">
                                 {input_message}
                              </div>
                           </Col>
                           <Col xs={12} md={2} lg={2} className="pb-2">
                              <Col className="fs-5 text-light" xs={12} md={6} lg={12}>
                                 {translate("table.type.title", language)}
                              </Col>
                              <Col sm className="pt-2">
                                 <div className="text-light"> Style {tone_id} </div>
                              </Col>
                           </Col>
                           <Col xs={12} md={3} lg={5} xl={5} className="pb-2">
                              <Col className="fs-5 text-light" xs={12} md={6} lg={12}>
                                 {translate("table.massage.title", language)}
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
                                 <div>วันที่สร้าง</div>
                              </Col>
                              <div className="text-light"> {formatDate(date_time)}</div>
                           </Col>
                        </Row>
                     ))
                  }

                  {/* A pagination, need to make this be functional */}
                  <div className={`${styles.pagination} -flex justify-content-end`}>
                     <a href="#" className={`${styles.pagination_item}`} onClick={() => setCurrentPage(currentPage - 1)}>
                        <VscTriangleLeft />
                     </a>
                     {Array.from({ length: Math.ceil(prompts.length / promptsPerPage) }, (_, index) => (
                        <a
                           key={index}
                           href="#"
                           className={`${styles.pagination_item} ${currentPage === index + 1 ? 'active' : ''}`}
                           onClick={() => setCurrentPage(index + 1)}
                        >
                           {index + 1}
                        </a>
                     ))}
                     <a href="#" className={styles.pagination_item} onClick={() => setCurrentPage(currentPage + 1)}>
                        <VscTriangleRight />
                     </a>
                  </div>

               </Container>
            </Container>
         </Container>
      </div>
   );
};

export default History;
