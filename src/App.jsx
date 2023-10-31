import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Addtodo from "./pages/AddTodoModal";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./contexts/AuthContext";
import { useContext, useState } from "react";
import { UserIdContext } from "./contexts/UserIdContext";
import "./App.css";
import AddTodoModal from "./pages/AddTodoModal";
import WelcomeEffect from "./components/WelcomeEffect";
import SummaryModal from "./pages/SummaryModal";
import SettingModal from "./pages/SettingModal";

function Layout() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userId = useContext(UserIdContext).userId;

  const [showModalAdd, setShowModalAdd] = useState(false);
  const closeModalAdd = () => setShowModalAdd(false);
  const openModalAdd = () => setShowModalAdd(true);

  const [showModalSummary, setShowModalSummary] = useState(false);
  const closeModalSummary = () => setShowModalSummary(false);
  const openModalSummary = () => setShowModalSummary(true);

  const [showModalSetting, setShowModalSetting] = useState(false);
  const closeModalSetting = () => setShowModalSetting(false);
  const openModalSetting = () => setShowModalSetting(true);

  function Handlelogout() {
    authContext.setToken(null);
    navigate("/");
  }

  return (
    <>
      {/* --------------top navbar------------------ */}
      <Navbar
        bg="light"
        variant="light"
        className="border-bottom border-dark border-1"
      >
        <Container>
          <Navbar.Brand
            href="/"
            className="fs-1 fw-light text-secondary border-start border-end border-dark px-3 py-0"
          >
            ZephTodos
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Button
              className="logoutButton fw-medium text-secondary fs-5"
              onClick={Handlelogout}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="p-0 mb-5">
        <Outlet />
      </div>

      {/* ----------------bottom navbar------------------- */}
      <Navbar
        expand="false"
        fixed="bottom"
        bg="light"
        className="navbarBottom border-top border-dark"
      >
        <Navbar.Toggle
          className="m-0 p-0 border-0"
          aria-controls={"navbarBottom"}
        >
          <Button
            variant="light"
            className="bi bi-list text-secondary fs-5 me-3 px-1 py-0"
          >
            <br />
            More
          </Button>
        </Navbar.Toggle>

        <Button
          variant="light"
          href="/"
          className="bi bi-house text-secondary fs-5 px-1 py-0"
        >
          <br />
          Home
        </Button>

        <Button
          variant="light"
          className="bi bi-plus-square text-secondary fs-5 ms-3 px-2 py-0"
          onClick={openModalAdd}
        >
          <br />
          Add
        </Button>

        {/* --------------'more' buttom------------- */}
        <Navbar.Offcanvas
          id={"navbarBottom"}
          aria-labelledby={"navbarBottom"}
          placement="start"
        >
          <Offcanvas.Header className="fs-3 me-2" closeButton>
            <Offcanvas.Title id={"navbarBottom"} className="fs-1 fw-light">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <div className="text-center fs-5 fw-light mb-3">{userId}</div>
              <div className="border border-1 my-2" />
              <Button
                variant="light"
                className="fs-4 fw-light"
                onClick={openModalSummary}
              >
                <i className="bi bi-bar-chart-line"></i> Summary
              </Button>
              <div className="border border-1 my-2" />
              <Button
                variant="light"
                className="fs-4 fw-light"
                onClick={openModalSetting}
              >
                <i className="bi bi-gear"></i> Setting
              </Button>
              <div className="border border-1 my-2" />
            </Nav>
            <p className="mt-5 pt-5 pb-3 fw-light text-center border-bottom">
              designed by zeph.
            </p>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>

      <AddTodoModal show={showModalAdd} handleClose={closeModalAdd} />
      <SummaryModal show={showModalSummary} handleClose={closeModalSummary} />
      <SettingModal show={showModalSetting} handleClose={closeModalSetting} />
    </>
  );
}

export default function App() {
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserIdContext.Provider value={{ userId, setUserId }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="login"
              element={
                <>
                  <WelcomeEffect /> <Login />
                </>
              }
            />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="add"
                element={
                  <RequireAuth>
                    <Addtodo />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <EditTodo />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserIdContext.Provider>
    </AuthContext.Provider>
  );
}
