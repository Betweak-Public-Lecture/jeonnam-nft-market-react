import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MarketListItem(props) {
  return (
    // <Link to={`/item/${props.tokenId}`}>
    <Card style={{ width: "18rem", color: "black", textDecoration: "none" }}>
      <Card.Img variant="top" src={props.imageSrc} />
      {/* <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body> */}
    </Card>
    // </Link>
  );
}
