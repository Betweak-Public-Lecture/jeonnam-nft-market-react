import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MarketListItem({ item }) {
  console.log(item);
  /**
   * props로 전달받은 item의 nftContract Address에 요청하여 이미지 URL 받아오기.
   */
  return (
    <Card style={{ width: "18rem", color: "black", textDecoration: "none" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <small>Minted by: {item.nftContract}</small> <br />
          <small>seller: {item.seller} </small> <br />
          <strong>ETH {item.price} </strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
