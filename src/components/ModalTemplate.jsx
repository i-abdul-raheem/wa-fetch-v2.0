import { Button, Modal } from "react-bootstrap";

export default function ModalTemplate(props) {
    return (
        <>
            <Modal show={props.show} backdrop="static" onHide={props.onHide}>
                <Modal.Header closeButton>{props.header}</Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={props.handleSubmit}>{props.actionTitle}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}