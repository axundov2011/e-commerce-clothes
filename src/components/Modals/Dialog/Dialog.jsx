import React from 'react'
import "./Dialog.css"
const Dialog = ({isDialogShowModal, setDialogShowModal}) => {
    const handleCloseDialog = (e) => {
        //checked le true ve ya false deyerini aliriq
        const checked = e.target.checked;
         
        //Burada checked ettiyimizde localStoragede true ve ya false oldugunu algilasin deye yaziriq.
        //Deyirik ki check edirem ki birdefelik bu modal birde qarsima cixmasin.
        localStorage.setItem('dialog', JSON.stringify(!checked))
    }
  return (
    <div className={`modal-dialog ${isDialogShowModal ? "show" : ""}`}>
    <div className="modal-content">
      <button className="modal-close" onClick={() => setDialogShowModal(false)}>
        <i className="bi bi-x"></i>
      </button>
      <div className="modal-image">
        <img src="/img/modal-dialog.jpg" alt="" />
      </div>
      <div className="popup-wrapper">
        <div className="popup-content">
          <div className="popup-title">
            <h3>NEWSLETTER</h3>
          </div>
          <p className="popup-text">
            Sign up to our newsletter and get exclusive deals you won find any where else straight to your inbox!
          </p>
          <form className="popup-form">
            <input type="text" placeholder="Enter Email Address Here" />
            <button className="btn btn-primary">SUBSCRIBE</button>
            <label>
              <input type="checkbox" onClick={handleCloseDialog} />
              <span>Don't show this popup again</span>
            </label>
          </form>
        </div>
      </div>
    </div>
    <div className='modal-overlay' onClick={() => setDialogShowModal(false)}></div>
  </div>
  )
}

export default Dialog
