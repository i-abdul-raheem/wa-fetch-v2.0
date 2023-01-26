import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function AddAPI(props) {
  const [form, setForm] = useState({
    url: "",
  });
  const handleSubmit = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(form),
    };
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/api`,
      options
    ).then((res) => res.json());
    if (res.status === 201) {
      props.hideAddAPI();
      setForm({ url: "" });
      props.updateApis();
    }
    props.setToastMsg(res.message);
    props.setToast(true);
  };
  return (
    <>
      <ModalTemplate
        header="Add API"
        show={props.showAddAPIState}
        onHide={() => {
          props.hideAddAPI();
          setForm({ url: "" });
        }}
        handleSubmit={handleSubmit}
        actionTitle="Add"
      >
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>API URL</Form.Label>
              <Form.Control
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="Enter API URL"
              />
            </Form.Group>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
