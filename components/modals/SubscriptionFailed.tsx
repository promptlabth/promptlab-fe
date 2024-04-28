import React from 'react'
import { Modal } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa';
import { Noto_Sans_Thai } from 'next/font/google';
import { IoMdClose } from 'react-icons/io';
import { useTranslation } from 'next-i18next';
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

const SubscriptionFailedModal = ({ show, hideModal }: any) => {
   const { t , i18n } = useTranslation(); 
   const handleClose = () => {
      hideModal(false)
   }
   return (
      <Modal className={noto_sans_thai.className} centered show={show} onHide={handleClose}>
         <div className="p-1 d-flex justify-content-end" style={{ backgroundColor: "none" }}>
            <IoMdClose onClick={handleClose} size={40} style={{ zIndex: 1, position: "absolute", cursor: "pointer" }} />
         </div>
         <Modal.Body>
            <div className="p-3 text-center">
               <FaInfoCircle
                  size={85}
                  className="mb-3"
                  style={{ color: "red" }} />
               <div className="mb-3 fs-4 ">
                  <b> {t("subscription.failed.header")}</b>
               </div>
               <p>
                  {t("subscription.failed")}
               </p>
               <p className="mb-1" style={{ color: "red" }}>
                  <b><u>isaman@promptlabai.com</u></b>
               </p>
            </div>
         </Modal.Body>
      </Modal>
   )
}


export default SubscriptionFailedModal
