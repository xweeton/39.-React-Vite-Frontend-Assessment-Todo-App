import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../features/todos/todosSlice";

export default function EditTodo() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");

  const id = parseInt(useParams().id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const now = new Date();
  const formattedDateTime = `${now.toLocaleDateString(
    "en-GB"
  )} ${now.toLocaleTimeString("en-GB", { hour12: true })}`;

  const todo = useSelector((state) =>
    state.todos.find((todo) => todo.id === id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      dispatch(
        updateTodo({
          id: todo.id,
          date: formattedDateTime,
          title,
          author,
          description,
          completed,
        })
      );
      navigate("/");
    }
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setAuthor(todo.author);
      setDescription(todo.description);
      setCompleted(todo.completed);
    }
  }, [todo]);

  return (
    <Container>
      <h1 className="my-4 fw-light">Edit Todo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 fw-medium" controlId="title">
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
          className="mb-3"
        />
        <Button variant="primary" type="submit" className="fw-medium px-3">
          <i className="bi bi-upload"></i> Submit
        </Button>
      </Form>
    </Container>
  );
}
