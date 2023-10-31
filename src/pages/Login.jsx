import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { UserIdContext } from "../contexts/UserIdContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userIdContext = useContext(UserIdContext);

  function login() {
    const isCorrectUsername = email === "zeph@zeph.com" || "abc@abc.com";
    const isCorrectPassword = password === "zeph";

    if (isCorrectUsername && isCorrectPassword) {
      authContext.setToken("1234");
      userIdContext.setUserId(email);
      navigate("/");
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'url("https://picsum.photos/id/316/2000/4000")',
        backgroundSize: "cover",
      }}
    >
      <div className="bg-light bg-opacity-50 rounded-5 px-sm-5 py-sm-4 p-2">
        <h1 className="fw-light text-center">Login Your Account</h1>
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-light fs-5">Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="zeph@zeph.com || abc@abc.com"
              value={email}
              onChangeCapture={(e) => {
                setEmail(e.target.value);
              }}
              style={{ width: "300px" }}
              className="mx-auto text-center"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-light fs-5">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="zeph"
              value={password}
              onChangeCapture={(e) => {
                setPassword(e.target.value);
              }}
              style={{ width: "300px" }}
              className="mx-auto text-center"
            />
          </Form.Group>
          <div className="text-center">
            <Button
              variant="dark"
              className="fw-bold px-5 rounded-5"
              onClick={login}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
