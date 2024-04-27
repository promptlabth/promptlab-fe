import React from 'react'
import { Modal } from 'react-bootstrap'
import { FaInfoCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { TFunction } from 'i18next';
interface SubscribeFailedModalProps {
  show: boolean
  handleCloseModal: () => void
  translate: TFunction<"translation", undefined>
}

export const SubscribeFailedModal = (props: SubscribeFailedModalProps) => {
  const { translate, show, handleCloseModal } = props
  return (
    <Modal centered show={show} onHide={handleCloseModal}>
      <div className="p-1 d-flex justify-content-end" style={{ backgroundColor: "none" }}>
        <IoMdClose onClick={handleCloseModal} size={40} style={{ zIndex: 1, position: "absolute", cursor: "pointer" }} />
      </div>
      <Modal.Body>
        <div className="p-3 text-center">
          <FaInfoCircle
            size={85}
            className="mb-3"
            style={{ color: "red" }} />
          <div className="mb-3 fs-4 ">
            <b> {translate("subscription.failed.header")}</b>
          </div>
          <p>
            {translate("subscription.failed")}
          </p>
          <p className="mb-1" style={{ color: "red" }}>
            <b><u>isaman@promptlabai.com</u></b>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  )
}


