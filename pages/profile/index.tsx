import React from 'react'
import styles from './styles.module.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Noto_Sans_Thai } from 'next/font/google';
import Head from 'next/head';
import { translate } from '@/languages/language';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserContext } from '@/contexts/UserContext';
import { BsCheckCircle } from 'react-icons/bs';
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from 'next/router';
import { cancelUserSubscribe } from '@/api/Payments';
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });

const Profile = () => {
   const userContext = useUserContext();
   const router = useRouter();
   const { language } = useLanguage();

   const handleCancelSubscription = async () => {
      const result = await cancelUserSubscribe()
      if (result) {
         router.push('/subscription/cancle_success')
      }
   }

   return (
      <div>
         <Head>
            <title>{translate("profile.title", language)}</title>
            <meta name="description" content="A generated messages history" />
         </Head>
         <div
            className="modal fade"
            id="canclepage"
            tabIndex={1}
            aria-labelledby="canclepageLabel"
            aria-hidden="true"
         >
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-body mb-4">
                     <div className=" text-end">
                        <button
                           type="button"
                           className="btn-close"
                           data-bs-dismiss="modal"
                           aria-label="Close"
                        ></button>
                     </div>
                     <div className="text-center">
                        <FaInfoCircle
                           size={85}
                           className="mb-3"
                           style={{ color: "red" }} />
                        <h4 className="mb-4">
                           <b>{translate("subscription.canclesubscription", language)}</b>
                        </h4>
                        <p className="mb-3">
                           {translate("subscription.canclesubscription.ask", language)}
                        </p>
                        <button
                           type="button"
                           onClick={handleCancelSubscription}
                           className={`btn btn-danger mb-2 ${styles.cancle_btn}`}
                           data-bs-dismiss="modal"
                        >
                           {translate("subscription.canclesubscription", language)}
                        </button>
                        <br />
                        <button
                           data-bs-dismiss="canclepage"
                           style={{ color: "red", textDecoration: "underline" }}
                        >
                           <small> {translate("subscription.canclesubscription.cancel", language)} </small>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
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
                     <h4 className="fw-bold text-white"> {translate("profile.subscription.title", language)} </h4>
                     <Row className={`${styles.profile_text}`}>
                        <Col md={7} className="ps-3 text-white">
                           <div className="d-flex align-items-center">
                              <div className="pe-2"> {translate("profile.subscription.planTitle", language)}: </div>
                              <svg className="mb-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28" fill="none">
                                 {userContext?.user?.planType! === "Gold" && <circle cx="14" cy="14" r="14" fill="#FFB800" />}
                                 {userContext?.user?.planType! === "Silver" && <circle cx="14" cy="14" r="14" fill="#A3A3A3" />}
                                 {userContext?.user?.planType! === "Bronze" && <circle cx="14" cy="14" r="14" fill="#CD7F32" />}
                              </svg>
                              <div
                                 className="fw-bold ps-2"
                                 style={{
                                    color: userContext?.user?.planType! === "Gold" ? "#FFB800" : userContext?.user?.planType! === "Silver" ? "#A3A3A3" : userContext?.user?.planType! === "Bronze" ? "#CD7F32" : "white",
                                 }}
                              > {userContext?.user?.planType} </div>
                           </div>
                        </Col>
                        <Col md={5} className='ps-3 text-white'>
                           <Col className="d-flex justify-content-between">
                              <div> {translate("subscription.detail.startDate", language)} </div>
                              {userContext?.user?.planType! === "Free" ? "-" : userContext?.user?.start_date?.toString()}
                              {/* {dayjs(starDate).format("DD MMMM YYYY HH:mm:ss")} */}
                           </Col>
                           <Col className="d-flex justify-content-between">
                              <div> {translate("subscription.detail.endDate", language)} </div>
                              {userContext?.user?.planType! === "Free" ? "-" : userContext?.user?.end_date?.toString()}
                              {/* {dayjs(endDate).format("DD MMMM YYYY HH:mm:ss")} */}
                           </Col>
                        </Col>
                     </Row>
                     <h4 className="pt-3 fw-bold text-white"> {translate("profile.subsciption.planDetail", language)} </h4>
                     <Row className={`text-white ${styles.profile_text} ps-2`}>
                        <div className="text-start">
                           <Row>
                              <div>
                                 <BsCheckCircle size={16} className="me-3" />
                                 {userContext?.user?.maxMessages} {translate("subscription.message", language)}
                              </div>
                           </Row>
                           <Row>
                              <div>
                                 <BsCheckCircle size={16} className="me-3" />
                                 {translate("subscription.chat", language)} &#40;Coming Soon&#41;
                              </div>
                           </Row>
                           <Row>
                              <div>
                                 <BsCheckCircle size={16} className="me-3" />
                                 {translate("subscription.support", language)}
                              </div>
                           </Row>
                        </div>
                     </Row>
                     {userContext?.user?.planType! !== "Free" &&
                        <div className={`pt-4 ${styles.cancle_subscription_button_container}`}>
                           <button
                              className={`${styles.cancle_subscription_button}`}
                              data-bs-toggle="modal"
                              data-bs-target="#canclepage"
                           >
                              {translate("subscription.canclesubscription", language)}
                           </button>
                        </div>
                     }
                  </Container>
               </Container>
            </Container>
         </div>
      </div >
   )
}

export default Profile