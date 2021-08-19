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
      <Row>
        {tokenURIs.map((item, idx) => {
          return (
            <Col xs={12} md={4}>
              <MarketListItem
                imageSrc={item}
                title={"NFT1"}
                description={"설명"}
                tokenId={myTokens[idx]}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
