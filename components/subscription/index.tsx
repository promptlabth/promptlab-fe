import React from 'react'
import { Modal } from 'react-bootstrap'

const SubscriptionModal = () => {
   return (
      <Modal show={true}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
         <Modal.Footer>
         </Modal.Footer>
      </Modal>
   )
}

export default SubscriptionModal