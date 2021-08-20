import React from "react";

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MarketListItem({ item, web3, ethAccount }) {
  console.log(item);
  /**
   * [연습문제]
   * props로 전달받은 item의 nftContract Address에 요청하여 이미지 URL (tokenURI) 받아오기.
   */
  const [imageURI, setImageURI] = React.useState("");
  const [etherPrice, setEtherPrice] = React.useState("");

  React.useEffect(() => {
    if (web3 && ethAccount) {
      const nftContract = web3.jnftContract.clone();

      nftContract.options.address = item.nftContract;
      nftContract.methods
        .tokenURI(item.tokenId)
        .call({
          from: ethAccount,
        })
        .then((data) => {
          setImageURI(data);
        });

      const etherPrice = web3.utils.fromWei(item.price, "ether");
      setEtherPrice(etherPrice);
    }
  }, [web3, ethAccount, item]);
  return (
    <Card style={{ width: "18rem", color: "black", textDecoration: "none" }}>
      <Card.Img variant="top" src={imageURI} />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <small>Minted by: {item.nftContract}</small> <br />
          <small>seller: {item.seller} </small> <br />
          <strong>ETH {etherPrice} </strong>
        </Card.Text>
        <Button
          variant="outline-dark"
          onClick={async (e) => {
            e.preventDefault();
            if (item.seller === ethAccount) {
              alert("자신의 물건은 살수가 없습니다.");
              return;
            }
            const result = await web3.marketContract.methods
              .createMarketSale(item.itemId)
              .send({
                from: ethAccount,
                value: item.price,
              });
            console.log(result);
          }}
        >
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
}
