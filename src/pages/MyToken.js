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
import Logo from "../logo.svg";

import ERC721Artifacts from "../artifacts/ERC721.json";
import Web3 from "web3";

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
              <div>
                <Card>
                  <Card.Header>{myTokens[idx]}</Card.Header>
                  <Card.Img src={item} />
                  <Card.Body>
                    <Button
                      onClick={async () => {
                        const isAgree = window.confirm("판매하시겠습니까?");
                        if (isAgree) {
                          console.log(web3.marketContract);
                          const _price = window.prompt(
                            "가격을 입력해주세요 (단위 - eth)"
                          );
                          /**
                           * createMarketItem 전에 해줘야 할 것들
                           * 1. 해당 nft-contract에서 market의 중개 허가를 받았는지 체크
                           * 2. 해당 nft-contract에서 허가O ==> createMarketItem
                           * 3. 해당 nft-contract에서 허가X
                           *    ==> 4. 허가 받고
                           *    ==> 5. createMarketItem 호출
                           */
                          // 1. 해당 nft-contract에서 marektContract의 중개 허가 체크
                          const nftContract = web3.jnftContract.clone();
                          const isApproved = await nftContract.methods
                            .isApprovedForAll(
                              ethAccount,
                              web3.marketContract.options.address
                            )
                            .call({ from: ethAccount });
                          console.log(isApproved);
                          // 3. 해당 nft-contract에서 허가X
                          if (
                            !isApproved &&
                            window.confirm(
                              "등록하시려면 해당 market의 권한을 할당 해 주셔야합니다."
                            )
                          ) {
                            try {
                              // 4. 해당 nftContract에 허가 받는다.
                              const receipt = await nftContract.methods
                                .setApprovalForAll(
                                  web3.marketContract.options.address,
                                  true
                                )
                                .send({
                                  from: ethAccount,
                                });
                              console.log(receipt);
                            } catch (error) {
                              console.error(error);
                              return;
                            }
                          }
                          // 5. createMarketItem 호출

                          web3.marketContract.methods
                            .createMarketItem(
                              web3.jnftContract._address,
                              myTokens[idx],
                              web3.utils.toWei(_price, "ether")
                            )
                            .send({
                              from: ethAccount,
                              value: web3.utils.toWei("0.001", "ether"),
                            })
                            .then((receipt) => {
                              console.log("receipt", receipt);
                            });
                        }
                      }}
                    >
                      Store
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
