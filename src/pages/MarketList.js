import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MarketListItem from "../components/MarketListItem";

import Logo from "../logo.svg";

export default function MarketList(props) {
  return (
    <Container style={{ marginTop: 120 }}>
      <Row>
        <Col xs={12} md={4}>
          <MarketListItem
            imageSrc={Logo}
            title={"NFT1"}
            description={"설명"}
            tokenId={1}
          />
        </Col>
      </Row>
    </Container>
  );
}
