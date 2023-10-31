import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { UserIdContext } from "../contexts/UserIdContext";
import { addTodo } from "../features/todos/todosSlice";

export default function AddTodoModal({ show, handleClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("1. \n2. \n3. ");
  const [completed, setCompleted] = useState(false);

  const userId = useContext(UserIdContext).userId;

  const dispatch = useDispatch();

  const now = new Date();
  const formattedDateTime = `${now.toLocaleDateString(
    "en-GB"
  )} ${now.toLocaleTimeString("en-GB", { hour12: true })}`;

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = {
      user: userId,
      id: Date.now(),
      date: formattedDateTime,
      title,
      author,
      description,
      completed,
    };
    dispatch(addTodo(newTodo));
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <div className="p-4">
        <Modal.Header closeButton>
          <h2 className="fw-light">Add Todo</h2>
        </Modal.Header>
        <Form onSubmit={handleAddTodo}>
          <Form.Group className="my-3 fw-medium" controlId="title">
            <Form.Label>Quote</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="The future belongs to those who believe in the beauty of their dreams."
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 fw-medium" controlId="title">
            <Form.Label>Author</Form.Label>
            <Form.Control
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              placeholder="Eleanor Roosevelt"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 fw-medium" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder={`1. Visualize a Dream\n2. Write It Down\n3. Plan One Action`}
              required
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            id="completed"
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mb-3 fw-medium"
          />

          <Button variant="primary" type="submit" className="fw-medium px-3">
            <i className="bi bi-upload"></i> Submit
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
