import React from 'react'
import './index.css'

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return <div className={`modal-overlay ${isModalOpen && 'show-modal'}`}>
    <div className="modal-container">
      <h3>modal content</h3>
      <button className="close-modal-btn" onClick={closeModal}>&times;</button>
    </div>
  </div>
}

export default Modal


{/* 

import Modal from './modal/Modal'

<Modal />
        
<div style={{ margin: 22, display: 'flex', justifyContent: 'center' }}>
  <button className="btn" onClick={openModal}>show modal</button>
</div> 

*/}