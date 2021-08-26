import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function ContractToken(props) {
  // 호출된 모든 Transfer Event를 가져옴.
  //   기록된 Event를 확인하면서
  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3">
          <h3>{props.address}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ul>
            <li>..</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
