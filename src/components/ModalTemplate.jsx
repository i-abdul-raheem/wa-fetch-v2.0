import { Button, Modal } from "react-bootstrap";

export default function ModalTemplate(props) {
    return (
        <>
            <Modal show={props.show} backdrop="static" onHide={props.onHide}>
                <Modal.Header style={{background: "#212529", color: "#fff"}} closeButton>{props.header}</Modal.Header>
                <Modal.Body style={{background: "#212529", color: "#fff"}}>
                    {props.children}
                </Modal.Body>
                <Modal.Footer style={{background: "#212529", color: "#fff"}}>
                    <Button variant="danger" onClick={props.onHide}>Cancel</Button>
                    <Button variant="secondary" onClick={props.handleSubmit}>{props.actionTitle}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}