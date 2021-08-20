import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MarketListItem from "../components/MarketListItem";

import Logo from "../logo.svg";

export default function MarketList({ web3, ethAccount }) {
  const [unSoldMarketItems, setUnSoldMarketItems] = React.useState([]);

  React.useEffect(() => {
    if (web3 && ethAccount) {
      web3.marketContract.methods
        .fetchUnsoldMarketItems()
        .call({
          from: ethAccount,
        })
        .then((result) => {
          console.log(result);
          setUnSoldMarketItems(result);
        });
    }
  }, [web3, ethAccount]);

  return (
    <Container style={{ marginTop: 120 }}>
      <Row>
        {unSoldMarketItems.map(function (item, idx) {
          return (
            <Col xs={12} md={3} className="my-3" key={item.itemId}>
              <MarketListItem item={item} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
