import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function ChangePassword(props) {
  const [form, setForm] = useState({
    password0: "",
    password1: "",
    password2: "",
  });

  const handleSubmit = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ ...form, username: props.username }),
    };
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/login`,
      options
    ).then((res) => res.json());
    if (res.status === 200) {
      props.hideChangePassword();
      setForm({ password0: "", password1: "", password2: "" });
    }
    props.setToastMsg(res.message);
    props.setToast(true);
  };

  return (
    <>
      <ModalTemplate
        header="Update Password"
        show={props.showChangePasswordState}
        onHide={() => {
          props.hideChangePassword();
          setForm({ password0: "", password1: "", password2: "" });
        }}
        handleSubmit={handleSubmit}
        actionTitle="Update"
      >
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                value={form.password0}
                onChange={(e) =>
                  setForm({ ...form, password0: e.target.value })
                }
                placeholder="Enter Current Password"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={form.password1}
                onChange={(e) =>
                  setForm({ ...form, password1: e.target.value })
                }
                placeholder="Enter New Password"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={form.password2}
                onChange={(e) =>
                  setForm({ ...form, password2: e.target.value })
                }
                placeholder="Enter Confirm Password"
              />
            </Form.Group>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
