import { Form, Row, Col } from "react-bootstrap";
import ModalTemplate from "./ModalTemplate";

export default function StartScan(props) {
    return (
        <>
            <ModalTemplate header="Start Scan" show={props.showScanState} onHide={props.hideScan} actionTitle="Start">
                <Form>
                    <Row>
                        <Col xs={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Country Code</Form.Label>
                                <Form.Control type="number" placeholder="+1" />
                            </Form.Group>
                        </Col>
                        <Col xs={9}>
                            <Form.Group className="mb-3">
                                <Form.Label>Number List</Form.Label>
                                <Form.Select required>
                                    <option>Select File...</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Select APIs</Form.Label>
                                <Form.Check type={"checkbox"} label="Check All" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </ModalTemplate>
        </>
    );
}