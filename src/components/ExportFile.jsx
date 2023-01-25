import { Form, Row } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function ExportFile(props) {
  return (
    <>
      <ModalTemplate
        header="Export File"
        show={props.showExportFileState}
        onHide={props.hideExportFile}
        actionTitle="Export"
      >
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>File Name</Form.Label>
              <Form.Select required>
                <option>Select File...</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
