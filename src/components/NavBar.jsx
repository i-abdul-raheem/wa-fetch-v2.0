import { Navbar } from "react-bootstrap";

export default function NavBar(props) {
  return (
    <>
      <Navbar className="mb-3 px-3 py-2" style={{background: "#212529"}} variant="dark" sticky>
        <Navbar.Brand>
          WA-FETCH <sub>V2.0</sub>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <span className="me-3"><i className="fa fa-user me-1"></i> {props.username}</span>
          </Navbar.Text>
          <Navbar.Text className="me-3">|</Navbar.Text>
          <Navbar.Text>
            <span onClick={() => {
              props.setUsername("");
              props.setToken("");
            }}><i className="fa fa-sign-out"></i></span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
