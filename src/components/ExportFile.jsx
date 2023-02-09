import { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function ExportFile(props) {
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    fileName: "",
  });
  useEffect(() => {
    setFiles(props.files);
  }, [props.files]);
  const handleSubmit = async () => {
    const res = await fetch(
      `http://localhost:${process.env.REACT_APP_API}/export/${form.fileName}`
    ).then((res) => res.text());
    console.log("done");
  };
  return (
    <>
      <ModalTemplate
        header="Export File"
        show={props.showExportFileState}
        onHide={props.hideExportFile}
        actionTitle="Export"
        handleSubmit={handleSubmit}
      >
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>File Name</Form.Label>
              <Form.Select
                value={form.fileName}
                onChange={(e) => setForm({ ...form, fileName: e.target.value })}
                required
              >
                <option value="">Select File...</option>
                {files.map((i) => (
                  <option key={`export-${i.title}`} value={i.title}>
                    {i.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
