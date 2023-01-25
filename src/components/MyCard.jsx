import { Card, Col, ProgressBar, Row } from "react-bootstrap";

export default function MyCard(props) {
  return (
    <>
      <Col xs={12} md={6} className="mb-3">
        <Card style={{background: "#212529", color: "#fff"}}>
          <Card.Header>
            <Row>
              <Col xs={6}><b>{props.header}</b></Col>  
              <Col xs={6} style={{textAlign: "right"}}>
                <i className={`ms-3 fa fa-${props.icon}`} onClick={props.headOnClick}></i>  
              </Col>  
            </Row>  
          </Card.Header>
          <Card.Body>
            {props.children}
          </Card.Body>
          <Card.Footer>
            <Card.Title>{props.footer}</Card.Title>
            <label htmlFor="1">File 1</label>
            <ProgressBar id="1" className="mb-2" now={30} label={`${30}%`} />
            <label htmlFor="2">File 2</label>
            <ProgressBar id="2" className="mb-2" now={50} label={`${50}%`} />
            <label htmlFor="3">File 3</label>
            <ProgressBar id="3" className="mb-2" now={10} label={`${10}%`} />
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
}
