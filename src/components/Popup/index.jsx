// PopupForm.js
import React, { useState } from 'react';
//import { Button, Modal } from "react-bootstrap";
import Modal from 'react-modal';
const Popup = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClose(); // Notify the parent component that the popup is closed
    };

    return (
        <Modal isOpen={isVisible}>
            <>
                <div>
                    <button onClick={handleClose}>x</button>
                    <h1>GFG</h1>
                    <h3>A computer science portal!</h3>
                </div>
            </>



            
        </Modal>
        // <Modal
        //     show={isVisible}
        //     onHide={handleClose}
        //     centered
        //     backdrop="static"
        //     keyboard={false}
        //     size="lg"
        // >
        //     <Modal.Header className="border-0 d-flex justify-content-center">
        //         <Modal.Title> </Modal.Title>
        //         <button
        //             variant="link"
        //             className="close btn btn-danger close_btn"
        //             onClick={handleClose}
        //         >
        //             {" "}
        //             {/*  onClick={closeWarning} onClick={handleModalClose} */}
        //             X
        //         </button>
        //     </Modal.Header>
        //     <Modal.Body className="pl-md-5 pr-md-5 pt-0">

        //     </Modal.Body>
        // </Modal>
    );
};






export default Popup;
