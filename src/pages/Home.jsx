import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard";

function CardGroup({ todos }) {
  return todos.map((todo, index) => {
    return (
      <Col md={12} lg={6} xl={4} key={index}>
        <TodoCard todo={todo} />
      </Col>
    );
  });
}

export default function Home() {
  const todos = useSelector((state) => state.todos);

  return (
    <div
      className="p-3 mb-5"
      style={{
        backgroundImage: 'url("https://picsum.photos/id/350/2000/4000")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // fixed image position, don't scroll
        minHeight: "100vh", // avoid click delete all, the image get cut
      }}
    >
      <Container>
        <Col xs={12} xl={8} className="p-3 mb-4 bg-dark bg-opacity-50">
          <p className="fw-light fs-1 text-light">Quote Life</p>
          <p className="fw-light fst-italic text-light">
            &quot;Tell me and I forget, teach me and I may remember, involve me
            and I learn.&quot; <em>- Benjamin Franklin</em>
          </p>
        </Col>

        <Row>
          <CardGroup todos={todos} />
        </Row>
      </Container>
    </div>
  );
}
