import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MarketListItem from "../components/MarketListItem";

export default function MarketList(props) {
  return (
    <Container style={{ marginTop: 120 }}>
      <Row>
        <Col xs={12} md={4}>
          <MarketListItem />
        </Col>
      </Row>
    </Container>
  );
}
