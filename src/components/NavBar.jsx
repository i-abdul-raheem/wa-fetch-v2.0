import { Navbar } from "react-bootstrap";

export default function NavBar(props) {
  return (
    <>
      <Navbar className="mb-3 px-3 py-2" bg="light" variant="light" sticky>
        <Navbar.Brand>
          WA-FETCH <sub>V2.0</sub>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <span><i className="fa fa-sign-out"></i></span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
