import { Modal, Button } from "react-bootstrap";
import { deleteAllTodo } from "../features/todos/todosSlice";
import { useDispatch } from "react-redux";

const SettingModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const handleDeleteAll = () => {
    dispatch(deleteAllTodo());
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-light fs-3">Setting</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h2 className="text-danger mb-4 mt-3">Warning!!</h2>
        <p>This will delete all your data, including all your progress.</p>
        <p>We won&apos;t be able to recover any of it for you later.</p>
        <div className="text-center mb-3 mt-4">
          <Button
            className="text-success bg-white border-success w-75 fw-medium"
            onClick={handleClose}
          >
            Nevermind, I don&apos;t want to delete all
          </Button>
        </div>
        <div className="text-center">
          <Button
            variant="danger"
            className="w-75 fw-medium"
            onClick={handleDeleteAll}
          >
            I am 100% certain. Delete all
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;
