import { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

export default function Login(props) {
  document.body.style.background = "#212529";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/login`,
      options
    ).then((res) => res.json());
    if (res.data) {
      props.setToken(res.data.token);
      props.setUsername(res.data.username);
    }
  };

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
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
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
                placeholder="Enter Password"
                className="mb-3"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                style={{
                  backgroundColor: "#212529",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "10px 14px",
                  borderRadius: "10px",
                }}
              />

              <button
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
                onClick={() => handleLogin()}
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
