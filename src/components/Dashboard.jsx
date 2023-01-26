import { Col, Row, Card, Button } from "react-bootstrap";
import Progressbar from "./Progressbar";
import MyCard from "./MyCard";
import NavBar from "./NavBar";

export default function Dashboard(props) {
  document.body.style.background = "#212529";
  return (
    <>
      <NavBar
        username={props.username}
        setUsername={props.setUsername}
        setToken={props.setToken}
      />
      <div className="p-3">
        <Row>
          <MyCard
            header="Scan List"
            footer="File(s) in progress"
            icon="play"
            headOnClick={props.scanShow}
          >
            <Card.Body>
              <b>In-Progress: </b> {props.inProgress} File(s)
            </Card.Body>
            <Card.Footer>
              <Card.Title>{props.footer}</Card.Title>
              <Progressbar file_no={1} progress={50} />
            </Card.Footer>
          </MyCard>
          <MyCard
            header="My Files"
            footer="File(s) being uploaded"
            icon="upload"
            headOnClick={props.uploadShow}
          >
            <Card.Body>
              <b>Total Files: </b> {props.files.length} File(s)
            </Card.Body>
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
          <Col xs={12} md={6} className="mb-3">
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
      </div>
    </>
  );
}
