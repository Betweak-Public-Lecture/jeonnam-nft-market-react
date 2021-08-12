import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Query(props) {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="jumbotron">
            <h1>QUERIES</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>GET TOKEN OWNER</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter Token ID" />
            <Form.Text className="text-muted">
              {/* We'll never share your email with anyone else. */}
            </Form.Text>
            <Button size={"sm"}>GET Owner</Button>
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
