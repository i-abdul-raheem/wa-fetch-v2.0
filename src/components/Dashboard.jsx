import { Col, Row, Card, Button, Table, Modal } from "react-bootstrap";
import Progressbar from "./Progressbar";
import MyCard from "./MyCard";
import NavBar from "./NavBar";
import { useState } from "react";

export default function Dashboard(props) {
  document.body.style.background = "#212529";
  const confirmDelete = async () => {
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
      `http://localhost:${process.env.REACT_APP_API}/file/${deleteId}`,
      options
    ).then((res) => res.json());
    props.setToastMsg(res.message);
    props.setToast(true);
    props.updateFiles();
    setDeleteFile(false);
  };
  const [deleteFile, setDeleteFile] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  return (
    <>
      <NavBar
        username={props.username}
        setUsername={props.setUsername}
        setToken={props.setToken}
      />
      <div className="p-3">
        <Row>
          <Col lg={6} sm={12}>
            <Row>
              <MyCard
                header="Scan List"
                footer="File(s) in progress"
                icon="play"
                headOnClick={props.scanShow}
              >
                <Card.Body>
                  <b>In-Progress: </b> {props.inProgress + 1} File(s)
                </Card.Body>
                <Card.Footer>
                  <Card.Title>{props.footer}</Card.Title>
                  <Progressbar
                    file_no={props.currentProgressTitle}
                    progress={props.currentProgress}
                    title={props.currentProgressStatus}
                  />
                </Card.Footer>
              </MyCard>
              <MyCard
                header="Export Files"
                footer="File(s) being exported"
                icon="download"
                headOnClick={props.exportShow}
              >
                <Card.Body>
                  <b>Total Files: </b> {props.files.length} File(s)
                </Card.Body>
              </MyCard>
            </Row>
          </Col>
          <Col lg={6} sm={12}>
            <Row>
              <MyCard
                header="My Files"
                footer="File(s) being uploaded"
                icon="upload"
                headOnClick={props.uploadShow}
              >
                <Card.Body>
                  <b>Total Files: </b> {props.files.length} File(s)
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th style={{ color: "white" }}>File Name</th>
                        <th style={{ color: "white" }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.files.map((i, index) => (
                        <tr key={index}>
                          <td style={{ color: "white" }}>{i.title}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => {
                                setDeleteId(i._id);
                                setDeleteFile(true);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </MyCard>
              <Col xs={12} className="mb-3">
                <Card style={{ background: "#212529", color: "#fff" }}>
                  <Card.Header>
                    <Row>
                      <Col xs={12}>
                        <b>Personal Settings</b>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Button
                      className="me-3"
                      variant="secondary"
                      onClick={props.passwordShow}
                    >
                      Update Password
                    </Button>
                    <Button
                      className="me-3"
                      variant="secondary"
                      onClick={props.apiShow}
                    >
                      Add New API
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal onHide={() => setDeleteFile(false)} show={deleteFile}>
          <Modal.Header closeButton>Delete File</Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDeleteFile(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => confirmDelete()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
