import React from "react";

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import web3, { marketContract, erc721Contract } from "../utils/ether";
import { ipfsToHttps } from "../utils/url";

export default function MarketListItem({ item }) {
  //   itemId: "0"
  // nftContract: "0x6D466760Cfb2f73EADef5C68cD62b456157f7126"
  // owner: "0x0000000000000000000000000000000000000000"
  // price: "10000000000000000000"
  // seller: "0x03F3D03f082eE06dF979EE5912B94793DcD52920"
  // tokenId: "0"

  const [ethAccount, setEtherAccount] = React.useState("");
  const [tokenURI, setTokenURI] = React.useState("");
  /**
   * tokenInfo
   * - name
   * - description
   * - image(ipfs://)
   */
  const [tokenInfo, setTokenInfo] = React.useState({
    name: "",
    description: "",
    image: "",
  });
  const [tokenSymbol, setTokenSymbol] = React.useState("");

  React.useEffect(() => {
    if (item) {
      const nftContract = erc721Contract.clone();
      nftContract.options.address = item.nftContract;

      nftContract.methods
        .tokenURI(item.tokenId)
        .call()
        .then((uri) => {
          console.log(uri);
          setTokenURI(uri);
        });
      web3.eth.requestAccounts().then((accounts) => {
        const account = accounts[0];
        setEtherAccount(account);
      });

      nftContract.methods
        .symbol()
        .call()
        .then((tokenSymbol) => {
          setTokenSymbol(tokenSymbol);
        });
    }
  }, [item]);

  React.useEffect(() => {
    // 연습문제
    // tokenURI는 현재 ipfs프로토콜로 기록되어있습니다.
    // 해당 tokenURI가 존재할 때, 해당 url을 https로 변경하여 데이터를 가져오고
    // 해당 데이터를 tokenInfo라는 state로 저장하세요.
    if (tokenURI) {
      const url = ipfsToHttps(tokenURI);
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setTokenInfo(data);
        });
    }
  }, [tokenURI]);

  return (
    <Card style={{ width: "18rem", color: "black", textDecoration: "none" }}>
      <Card.Header>{tokenInfo.name}</Card.Header>
      <Card.Img variant="top" src={ipfsToHttps(tokenInfo.image)} />
      <Card.Body>
        <Card.Title>ETH {web3.utils.fromWei(item.price, "ether")}</Card.Title>
        <Card.Text>
          {/* <small>Minted by: {item.nftContract}</small> <br /> */}
          <small>seller: {item.seller} </small> <br />
        </Card.Text>
        <Button
          variant="outline-dark"
          onClick={async (e) => {
            e.preventDefault();
            if (item.seller === ethAccount) {
              alert("자신의 물건은 살수가 없습니다.");
              return;
            }
            const result = await marketContract.methods
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
      <Card.Footer>
        {tokenSymbol}
        {/* [연습]
        해당하는 ERC721 NFTContract에 symbol이라는 함수를 호출하여 내용을 해당 위치에 Rendering */}
      </Card.Footer>
    </Card>
  );
}
