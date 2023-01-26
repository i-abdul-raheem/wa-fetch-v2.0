import { Form, Row, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function UploadFile(props) {
  const [form, setForm] = useState({
    title: "",
    myFile: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", form.myFile);
    formData.append("title", form.title);
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ${props.token}`,
      },
    };
    try {
      const axiosInstance = axios.create({
        baseURL: `http://localhost:${process.env.REACT_APP_API}/`,
      });
      const res = await axiosInstance.post("/file", formData, options);
      if (res.data.status === 201) {
        props.hideUploadFile();
        setForm({ myFile: "", title: "" });
        props.updateFiles();
        props.setToastMsg(res.data.message);
      }
    } catch (ex) {
      props.setToastMsg(ex.response.data.message);
    }
    props.setToast(true);
  };
  return (
    <>
      <Modal
        show={props.showUploadFileState}
        backdrop="static"
        onHide={() => {
          props.hideUploadFile();
          setForm({ myFile: "", title: "" });
        }}
      >
        <Modal.Header
          style={{ background: "#212529", color: "#fff", border: "2px" }}
          closeButton
        >
          Upload File
        </Modal.Header>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Modal.Body
            style={{ background: "#212529", color: "#fff", border: "2px" }}
          >
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>File Name</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  value={form.title}
                  placeholder="Enter File Title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select File</Form.Label>
                <Form.Control
                  type="file"
                  name="myFile"
                  onChange={(e) =>
                    setForm({ ...form, myFile: e.target.files[0] })
                  }
                  accept=".csv"
                  required
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer
            style={{ background: "#212529", color: "#fff", border: "2px" }}
          >
            <Button variant="danger" onClick={props.hideUploadFile}>
              Cancel
            </Button>
            <Button variant="secondary" type="submit">
              Upload
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
