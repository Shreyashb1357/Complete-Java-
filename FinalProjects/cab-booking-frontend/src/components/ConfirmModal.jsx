import { Modal, Button } from "react-bootstrap";

function ConfirmModal({ show, onClose, onConfirm, pickup, drop }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Ride</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Pickup:</strong> {pickup}</p>
        <p><strong>Drop:</strong> {drop}</p>
        <p>Do you want to confirm this ride?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={onConfirm}>
          Confirm Ride
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
