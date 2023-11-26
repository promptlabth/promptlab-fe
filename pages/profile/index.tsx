import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Noto_Sans_Thai } from 'next/font/google';
import Head from 'next/head';
import { translate } from '@/languages/language';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserContext } from '@/contexts/UserContext';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'; // import plugin
import { BsCheckCircle } from 'react-icons/bs';
dayjs.extend(utc); // Extend dayjs with the utc plugin
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
const Profile = () => {
   const userContext = useUserContext();
   const [starDate, setStartDate] = React.useState<Date | null>(null);
   const [endDate, setEndDate] = React.useState<Date | null>(null);
   const { language } = useLanguage();
   useEffect(() => {
      setStartDate(dayjs(userContext?.user?.start_date!).toDate())
      setEndDate(dayjs(userContext?.user?.end_date!).toDate())
   }, [])
   return (
      <div>
         <Head>
            <meta name="description" content="A profile page" />
         </Head>
         <div className={noto_sans_thai.className}>
            <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
               <Container className={styles.page_container}>
                  <figure className="text-center pb-1 pt-3 text-light">
                     <h2>
                        <b>{translate("profile.title", language)}</b>
                     </h2>
                  </figure>

                  <Container fluid={true} className={styles.profile_container_bg}>
                     <Row className='pt-1'>
                        <Row className="text-white d-flex align-items-center">
                           <div className="col-md-1">
                              <div className={`${styles.user_profile_pic_container}`}>
                                 <img
                                    className={`${styles.user_profile_pic}`}
                                    src={userContext?.user?.profilepic}
                                    alt="profic-pic"
                                    style={{
                                       border: userContext?.user?.planType! === "Gold" ? "3.25px solid #FFB800" : userContext?.user?.planType! === "Silver" ? "3.25px solid #A8A8A8" : userContext?.user?.planType! === "Bronze" ? "3.25px solid #CD7F32" : "none",
                                    }}
                                 />
                              </div>
                           </div>
                           <div className="col-md-11 text-white">
                              <div className={styles.user_profile_detail_container}>
                                 <div className="ps-2">
                                    <h4 className="fw-bold"> {userContext?.user?.name} </h4>
                                    <div className=""> <b>Email:</b> {userContext?.user?.email} </div>
                                 </div>
                              </div>
                           </div>
                        </Row>
                     </Row >
                     <hr className="text-white"></hr>
                     <h4 className="fw-bold text-white"> แพลนสมาชิก </h4>
                     <Row className={`${styles.profile_text}`}>
                        <Col md={7} className='ps-3 text-white'>
                           <div className="d-flex align-items-center">
                              <div className="pe-2"> ประเภทสมาชิกปัจจุบัน: </div>
                              <svg className="mb-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                                 {userContext?.user?.planType! === "Gold" && <circle cx="14" cy="14" r="14" fill="#FFB800" />}
                                 {userContext?.user?.planType! === "Silver" && <circle cx="14" cy="14" r="14" fill="#A3A3A3" />}
                                 {userContext?.user?.planType! === "Bronze" && <circle cx="14" cy="14" r="14" fill="#CD7F32" />}
                              </svg>
                              <div 
                                 className="fw-bold ps-2"
                                 style={{
                                    color: userContext?.user?.planType! === "Gold" ? "#FFB800" : userContext?.user?.planType! === "Silver" ? "#A3A3A3" : "#CD7F32"
                                 }}
                              > {userContext?.user?.planType} </div>
                           </div>
                        </Col>
                        <Col md={5} className='ps-3 text-white'>
                           <Col className="d-flex justify-content-between">
                              <div> วันที่เริ่ม: </div>
                              {dayjs(starDate).format("DD MMMM YYYY HH:mm:ss")}
                           </Col>
                           <Col className="d-flex justify-content-between">
                              <div> วันที่สิ้นสุด: </div>
                              {dayjs(endDate).format("DD MMMM YYYY HH:mm:ss")}
                           </Col>
                        </Col>
                     </Row>
                     <h4 className="pt-3 fw-bold text-white"> แพลนนี้มีอะไรบ้าง </h4>
                     <Row className={`text-white ${styles.profile_text} ps-2`}>
                        <div className="text-start">
                           <Row>
                              <div>
                                 <BsCheckCircle
                                    size={16}
                                    className="me-3"
                                 ></BsCheckCircle>
                                 25 {translate("subscription.message", language)}
                              </div>
                           </Row>
                           <Row>
                              <div>
                                 <BsCheckCircle
                                    size={16}
                                    className="me-3"
                                 ></BsCheckCircle>
                                 {translate("subscription.chat", language)} &#40;Coming Soon&#41;
                              </div>
                           </Row>
                           <Row>
                              <div>
                                 <BsCheckCircle
                                    size={16}
                                    className="me-3"
                                 ></BsCheckCircle>
                                 {translate("subscription.support", language)}
                              </div>
                           </Row>
                        </div>
                  </Row>
               </Container>
            </Container>
         </Container>
      </div>
      </div >
   )
}

export default Profile