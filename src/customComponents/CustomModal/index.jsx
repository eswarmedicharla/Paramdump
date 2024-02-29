import React, { Children } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({
  editClick,
  handleClosePopup,
  showPopup,
  handleSubmit,
  children,
}) => {
  return (
    <Modal show={showPopup} onHide={handleClosePopup}>
      <Modal.Header closeButton>
        <Modal.Title>{editClick ? "Edit Row" : "Add Row"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePopup}>
          {"Close"}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {editClick ? "Save Changes" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
