import { color } from "framer-motion";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalData = ({
  showPopup,
  popupsize,
  title,
  bodyData,
  selectedRow,
  editedData,
  handleSubmit,
  handleClose,
  responseReceived,
  buttonLabel,
  hideSubmitButton = true,
  submitButtonLabel,
  closeButtonLabels,
  buttonVisible = true,
}) => {
  return (
    <div
    // className={`modal-content`}
    >
      <Modal
        show={showPopup}
        centered
        backdrop="static"
        keyboard={false}
        size={popupsize}
      >
        <Modal.Header
          className={`border-0 d-flex justify-content-center customModalHeader `}
        >
          <Modal.Title style={{ color: "#ffff", fontSize: "16px" }}>
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
          {bodyData}
        </Modal.Body>

        {/* <div className="d-flex justify-content-center gap-3 mb-3">
          {responseReceived ? (
            <Button className="btnn " variant="primary" onClick={handleClose}>
              OK
            </Button>
          ) : (
            <>
              {(selectedRow || handleSubmit) && (
                <Button
                  variant="primary"
                  className="btnn"
                  onClick={handleSubmit}
                >
                  {selectedRow ? "Update" : "Submit"}
                </Button>
              )}
              <Button className="btnn " variant="danger" onClick={handleClose}>
                Close
              </Button>
            </>
          )}
        </div> */}
        <div className="d-flex justify-content-center gap-3 modal-button-bg">
          {buttonVisible && (
            <Button className="modal-buttons " onClick={handleSubmit}>
              {submitButtonLabel}
            </Button>
          )}
          <Button className="modal-buttons" onClick={handleClose}>
            {closeButtonLabels}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalData;
