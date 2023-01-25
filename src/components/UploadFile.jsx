import { Form, Row } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function UploadFile(props) {
  return (
    <>
      <ModalTemplate
        header="Upload File"
        show={props.showUploadFileState}
        onHide={props.hideUploadFile}
        actionTitle="Upload"
      >
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>File Name</Form.Label>
              <Form.Control type="text" placeholder="Enter File Title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select File</Form.Label>
              <Form.Control type="file" required  />
            </Form.Group>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
