import React from "react";
/**
 * 실습: MyToken Page 기본 layout 잡기
 * MarketList와 비슷한 형태의 layout을 가지도록 구성.
 * ** react-bootstrap 이용.
 */
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardGroup,
  Form,
} from "react-bootstrap";
import MarketListItem from "../components/MarketListItem";
import MyTokenItem from "../components/MyTokenItem";
import Logo from "../logo.svg";

import ERC721Artifacts from "../artifacts/ERC721.json";
import Web3 from "web3";
import { ipfsToHttps } from "../utils/url";

const web3 = new Web3(Web3.givenProvider);
const ercContract = new web3.eth.Contract(ERC721Artifacts.abi);

export default function MyToken({ web3, ethAccount }) {
  const [tokenCount, setTokenCount] = React.useState(0);
  const [myTokens, setMyTokens] = React.useState([]);
  const [tokenURIs, setTokenURIs] = React.useState([]);
  const [nftAddress, setNftAddress] = React.useState("");
  const [userContractAddrs, setUserContractAddrs] = React.useState([]);

  React.useEffect(() => {
    if (web3 && ethAccount) {
      console.log("get another nfts");
      console.log(web3.marketContract.methods);
      web3.marketContract.methods
        .fetchContractByUser()
        .call({
          from: ethAccount,
        })
        .then((contractAddrs) => {
          console.log(contractAddrs);
          setUserContractAddrs(contractAddrs);
        });
    }
  }, [web3, ethAccount]);

  React.useEffect(() => {
    // userContractAddrs에 각각 요청을 보내어, token의 이동경로를 파악.
    userContractAddrs.map((item) => {
      ercContract.options.address = item;
      console.log("token");
      console.log(ercContract);

      ercContract
        .getPastEvents("Transfer", {
          fromBlock: 0,
          toBlock: "latest",
        })
        .then((data) => {
          console.log(data);
        });
    });
  }, [userContractAddrs]);

  React.useEffect(() => {
    if (web3 && ethAccount) {
      web3.jnftContract.methods
        .balanceOf(ethAccount)
        .call({ from: ethAccount })
        .then((data) => {
          console.log(data);
          setTokenCount(parseInt(data));
        });

      web3.jnftContract.methods
        .fetchTokensByAddress(ethAccount)
        .call({ from: ethAccount })
        .then((data) => {
          console.log("myTokens:", data);
          setMyTokens(data);
        });
    }
  }, [web3, ethAccount]);

  React.useEffect(() => {
    if (web3 && ethAccount && myTokens.length > 0) {
      const promiseArr = myTokens.map(function (item) {
        return new Promise((resolve, reject) => {
          web3.jnftContract.methods
            .tokenURI(item)
            .call({ from: ethAccount })
            .then((uri) => {
              resolve(uri);
            });
        });
      });

      Promise.all(promiseArr).then((data) => {
        console.log("uri", data);
        setTokenURIs(data);
      });
    }
  }, [web3, ethAccount, myTokens]);

  return (
    <Container>
      <Row className="my-4">
        <h2>My Tokens ({tokenCount})</h2>
      </Row>
      <Row className="my-4">
        <Col>
          <Form.Control
            type="text"
            onChange={(e) => {
              setNftAddress(e.target.value);
            }}
            value={nftAddress}
          />
          <Button
            onClick={async (e) => {
              e.preventDefault();
              const receipt = await web3.marketContract.methods
                .addMyTokenContract(nftAddress)
                .send({
                  from: ethAccount,
                });
              setNftAddress("");
              console.log(receipt);
            }}
          >
            조회
          </Button>
        </Col>
      </Row>
      <Row>
        {tokenURIs.map((item, idx) => {
          return (
            <Col xs={12} md={3} className="my-3">
              <MyTokenItem item={item} tokenId={myTokens[idx]} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
