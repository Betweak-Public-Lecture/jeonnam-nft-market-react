import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Home(props) {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="jumbotron">
            <h1>NFT MarketPlace</h1>
            Account: {props.ethAccount || "Metamask연결이 필요합니다."}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
