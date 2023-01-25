import { Form, Row } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function ChangePassword(props) {
  return (
    <>
      <ModalTemplate
        header="Update Password"
        show={props.showChangePasswordState}
        onHide={props.hideChangePassword}
        actionTitle="Update"
      >
        <Form>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Current Password" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter New Password" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Confirm Password" />
            </Form.Group>
          </Row>
        </Form>
      </ModalTemplate>
    </>
  );
}
