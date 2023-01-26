import { useState } from "react";
import { Form, Row, Col, Table } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function StartScan(props) {
  const [form, setForm] = useState({
    code: "",
    file: "",
  });
  const deleteApi = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${props.token}`,
      },
    };
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/api/${id}`,
      options
    ).then((res) => res.json());
    if (res.status === 200) {
      props.updateApis();
    }
    props.setToastMsg(res.message);
    props.setToast(true);
  };

  return (
    <>
      <ModalTemplate
        header="Start Scan"
        show={props.showScanState}
        onHide={props.hideScan}
        actionTitle="Start"
      >
        <Form>
          <Row>
            <Col xs={3}>
              <Form.Group className="mb-3">
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  type="number"
                  placeholder="+1"
                />
              </Form.Group>
            </Col>
            <Col xs={9}>
              <Form.Group className="mb-3">
                <Form.Label>Number List</Form.Label>
                <Form.Select
                  value={form.file}
                  onChange={(e) => setForm({ ...form, file: e.target.value })}
                  required
                >
                  <option>Select File...</option>
                  {props.files.map((i, index) => (
                    <option key={index} value={i.id}>
                      {i.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Select APIs</Form.Label>
                <Table responsive striped hover>
                  <tbody>
                    {props.apis.map((i, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Check type={"checkbox"} id={`api-${index}`} />
                        </td>
                        <td style={{ color: "#fff" }}>
                          <label htmlFor={`api-${index}`}>{i.url}</label>
                        </td>
                        <td>
                          <i
                            onClick={() => deleteApi(i.id)}
                            className="text-danger fa fa-trash"
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
