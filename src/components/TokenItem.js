import React from "react";

import { ListGroupItem, Card, Button } from "react-bootstrap";
import web3, {
  jnftContract,
  marketContract,
  erc721Contract,
} from "../utils/ether";
import { ipfsToHttps } from "../utils/url";

export default function TokenItem({ tokenId, contractAddr }) {
  const [tokenURI, setTokenURI] = React.useState("");
  const [tokenInfo, setTokenInfo] = React.useState({
    name: "",
    description: "",
    image: "",
  });
  React.useEffect(() => {
    const ercContract = jnftContract.clone();
    ercContract.options.address = contractAddr;
    ercContract.methods
      .tokenURI(tokenId)
      .call()
      .then((uri) => {
        console.log(uri);

        setTokenURI(uri);
      });
  }, []);

  React.useEffect(() => {
    if (tokenURI) {
      console.log(tokenURI);
      const url = ipfsToHttps(tokenURI);
      console.log(url);
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log("token정보");
          console.log(data);
          setTokenInfo(data);
        });
    }
  }, [tokenURI]);

  return (
    <Card style={{ width: "18rem" }}>
      {/* <ListGroupItem>
        <div>
          {tokenId} -
          <a href={ipfsToHttps(tokenURI)} target="_blank" rel="noreferrer">
            {tokenURI}
          </a>
        </div>
        </ListGroupItem> */}
      <Card.Header>{tokenId}</Card.Header>
      <Card.Img variant="top" src={ipfsToHttps(tokenInfo.image)} />
      <Card.Body>
        <Card.Title>{tokenInfo.name}</Card.Title>
        <Card.Text>{tokenInfo.description}</Card.Text>
        {/* 
        [실습]
        - 판매 버튼 클릭시 스토어에 등록되도록 구성
        [요구조건]
        - Market에서 보여야 함.
        - Market에서 구매가 가능해야함. (setApprovalForAll)
            - NFTContract에서 setApprovalForAll
            - marketContract에서 createMarketItem
         */}
        <Button
          variant="primary"
          onClick={async (e) => {
            e.preventDefault();
            const nftContract = erc721Contract.clone();
            const accounts = await web3.eth.requestAccounts();
            const account = accounts[0];

            nftContract.options.address = contractAddr;
            const isApproved = await nftContract.methods
              .isApprovedForAll(account, marketContract.options.address)
              .call();
            if (!isApproved) {
              const approvalReceipt = await nftContract.methods
                .setApprovalForAll(marketContract.options.address, true)
                .send({
                  from: account,
                });
              console.log(approvalReceipt);
            }
            const price = prompt("판매금액 입력: ETH");
            if (!price) {
              return;
            }
            // - marketContract에서 createMarketItem
          }}
        >
          판매
        </Button>
      </Card.Body>
    </Card>
  );
}
