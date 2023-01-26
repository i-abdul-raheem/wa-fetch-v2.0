import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import Progressbar from "./Progressbar";

export default function MyCard(props) {
  return (
    <>
      <Col xs={12} className="mb-3">
        <Card style={{background: "#212529", color: "#fff"}}>
          <Card.Header>
            <Row>
              <Col xs={6}><b>{props.header}</b></Col>  
              <Col xs={6} style={{textAlign: "right"}}>
                <i className={`ms-3 fa fa-${props.icon}`} onClick={props.headOnClick}></i>  
              </Col>  
            </Row>  
          </Card.Header>
            {props.children}
        </Card>
      </Col>
    </>
  );
}
