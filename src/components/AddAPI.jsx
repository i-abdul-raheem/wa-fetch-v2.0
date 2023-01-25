import { Form, Row } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function AddAPI(props) {
  return (
    <>
      <ModalTemplate
        header="Add API"
        show={props.showAddAPIState}
        onHide={props.hideAddAPI}
        actionTitle="Add"
      >
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>API URL</Form.Label>
              <Form.Control type="url" placeholder="Enter API URL" />
            </Form.Group>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
