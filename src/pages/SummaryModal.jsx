import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";

const SummaryModal = ({ show, handleClose }) => {
  const todos = useSelector((state) => state.todos);
  const totalTodosCount = todos.length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  const notCompletedTodosCount = todos.filter((todo) => !todo.completed).length;

  const chartData = [
    ["Task", "Count", { role: "style" }],
    ["Total", totalTodosCount, "yellow"],
    ["Completed", completedTodosCount, "green"],
    ["Not Completed", notCompletedTodosCount, "red"],
  ];

  const chartOptions = {
    title: "Todo Amount",
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-light fs-3">Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Chart
          chartType="ColumnChart"
          width={"100%"}
          height={"300px"}
          data={chartData}
          options={chartOptions}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SummaryModal;
