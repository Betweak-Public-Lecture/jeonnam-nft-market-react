import React from "react";
/**
 * 실습: MyToken Page 기본 layout 잡기
 * MarketList와 비슷한 형태의 layout을 가지도록 구성.
 * ** react-bootstrap 이용.
 */
import { Container, Row, Col } from "react-bootstrap";
import MarketListItem from "../components/MarketListItem";
import Logo from "../logo.svg";

export default function MyToken({ web3, ethAccount }) {
  const [tokenCount, setTokenCount] = React.useState(0);
  const [myTokens, setMyTokens] = React.useState([]);
  const [tokenURIs, setTokenURIs] = React.useState([]);

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
      <Row>
        {tokenURIs.map((item, idx) => {
          return (
            <Col xs={12} md={4}>
              <div
                onClick={() => {
                  const isAgree = window.confirm("판매하시겠습니까?");
                  if (isAgree) {
                    console.log(web3.marketContract);
                    const _price = window.prompt(
                      "가격을 입력해주세요 (단위 - wei)"
                    );
                    const price = parseInt(_price);
                    // marketItem을 등록하는 함수
                    // (address _nftContract, uint256 _tokenId, uint256 _price)

                    // _nftContract: jnftContractAddress
                    // _tokenId: myTokens[idx],
                    // _price: price
                    console.log(web3);
                    web3.marketContract.methods
                      .createMarketItem(
                        web3.jnftContract._address,
                        myTokens[idx],
                        _price
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
                <MarketListItem imageSrc={item} tokenId={myTokens[idx]} />
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
