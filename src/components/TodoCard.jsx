import { useContext, useEffect, useState } from "react";
import { Button, Card, Modal, Nav, Tab } from "react-bootstrap";
import { UserIdContext } from "../contexts/UserIdContext";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../features/todos/todosSlice";

export default function TodoCard({ todo }) {
  // prop to home.jsx
  const completed = todo.completed;

  // border color affect by boolean of completed
  const border = completed ? "success" : "danger";

  // timer function
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // show Modal delete in actions
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  // get userId from login page, for filter todos by userId
  const userId = useContext(UserIdContext).userId;

  // sender for redux
  const dispatch = useDispatch();

  // setter for active tab
  const [activeTab, setActiveTab] = useState(null);

  // clear browser timer, prevent memory leak
  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  // filter todos by userId
  if (todo.user !== userId) {
    return null;
  }

  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(0);
  };

  // delete button, auto close modal after click delete
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTodo(todo.id));
    handleCloseDelete();
  };

  // tab button, already active, clicking it again will deactivate it.
  const handleTabClick = (tabKey) => {
    // if same
    if (activeTab === tabKey) {
      // deactiving
      setActiveTab(null);
    } else {
      //active
      setActiveTab(tabKey);
    }
  };

  return (
    <div className="cardContainer">
      <Card
        border={border}
        className="mb-5 border-3 rounded-4"
        style={{ backgroundColor: "rgb(254,255,156)" }}
      >
        <Card.Header>{todo.date}</Card.Header>
        <Card.Body>
          <Card.Title className="fw-light text-dark fs-4 mb-1">
            {todo.title}
          </Card.Title>
          <Card.Title className="fw-light fst-italic text-secondary fs-6 mb-3 pb-3 border-bottom">
            - {todo.author}
          </Card.Title>

          {/* style={{ whiteSpace: 'pre-line' }} for rendering \n */}
          <Card.Text
            className="fw-medium fs-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {todo.description}
          </Card.Text>

          <Tab.Container
            activeKey={activeTab}
            onSelect={(tabKey) => handleTabClick(tabKey)}
          >
            <Nav className="tabContainer">
              <Nav.Item>
                <Nav.Link eventKey="timer" className="tabItem">
                  Timer
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="actions" className="tabItem">
                  Actions
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="text-center">
              <Tab.Pane eventKey="timer">
                <p className="me-3 mt-1 fs-4">{timer} seconds</p>
                <Button
                  onClick={startTimer}
                  variant="success"
                  className="fw-medium"
                >
                  <i className="bi bi-play"></i> Start
                </Button>
                <Button
                  onClick={pauseTimer}
                  variant="warning"
                  className="ms-2 fw-medium"
                >
                  <i className="bi bi-pause-fill"></i> Pause
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="danger"
                  className="ms-2 fw-medium"
                >
                  <i className="bi bi-arrow-clockwise"></i> Reset
                </Button>
              </Tab.Pane>
              <Tab.Pane eventKey="actions">
                <Button
                  variant="secondary"
                  href={`edit/${todo.id}`}
                  className="mt-2 fw-medium"
                >
                  <i className="bi bi-pencil"></i> Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={handleShowDelete}
                  className="ms-3 mt-2 fw-medium"
                >
                  <i className="bi bi-trash3"></i> Delete
                </Button>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete this todo</Modal.Title>
            </Modal.Header>

            <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Cancel
              </Button>

              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
        <Card.Footer
          className="text-light fw-bold"
          style={{ backgroundColor: completed ? "green" : "red" }}
        >
          {completed ? "Completed" : "Not Completed"}
        </Card.Footer>
      </Card>
    </div>
  );
}
