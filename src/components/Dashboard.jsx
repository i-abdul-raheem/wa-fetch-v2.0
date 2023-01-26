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
                  {props.currentProgress.map((i, index) => (
                    <Progressbar
                      key={index}
                      file_no={props.currentProgressTitle[index]}
                      progress={i}
                      title={props.currentProgressStatus[index]}
                    />
                  ))}
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
      </div>
    </>
  );
}
