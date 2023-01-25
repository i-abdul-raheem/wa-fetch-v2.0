import { Container, Card, Row, Col } from "react-bootstrap";

export default function Login(props) {
  document.body.style.background = "#212529";
  return (
    <Container style={{ background: "#212529" }} fluid>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col col="12">
          <Card
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "0", border: "0", maxWidth: "400px" }}
          >
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your username and password
              </p>

              <input
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
                placeholder="Enter Username"
                className="mb-3"
                style={{
                  backgroundColor: "#212529",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "10px 14px",
                  borderRadius: "10px",
                }}
              />
              <input
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                placeholder="Enter Password"
                id="formControlLg"
                className="mb-3"
                type="password"
                style={{
                  backgroundColor: "#212529",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "10px 14px",
                  borderRadius: "10px",
                }}
                size="lg"
              />

              <p className="small mb-3 pb-lg-2">
                <a class="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <button
                outline
                className="mx-2 px-5"
                style={{
                  backgroundColor: "#212529",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "10px 14px",
                  borderRadius: "10px",
                }}
                color="white"
                size="lg"
              >
                Login
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
