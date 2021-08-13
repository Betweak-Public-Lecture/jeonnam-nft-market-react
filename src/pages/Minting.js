import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";

export default function Minting(props) {
  return (
    <Container style={{ marginTop: 100 }}>
      <Row>
        <Col>
          <h2>Mint an Item</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ImageUploader />
          {/* react-images-upload props참조 --> 
              [rendering 조건]
              1. singlefile
              2. imageFile
              3. preview 가능
              4. upload한 file을 state에 set하는 것 
          */}

          <Button variant={"dark"}>Mint</Button>
        </Col>
      </Row>
    </Container>
  );
}
