import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import TokenItem from "./TokenItem";

import web3, { jnftContract } from "../utils/ether";
import { getTokensByEvent } from "../utils/service";

export default function ContractToken(props) {
  // 호출된 모든 Transfer Event를 가져옴.
  // 기록된 Event를 확인하면서
  const { address } = props;
  const [ethAccount, setEthAccount] = React.useState("");
  const [tokens, setTokens] = React.useState([]);

  React.useEffect(() => {
    web3.eth.requestAccounts().then((accounts) => {
      setEthAccount(accounts[0]);
    });
  }, []);

  React.useEffect(() => {
    if (address && ethAccount) {
      getTokensByEvent(address, ethAccount).then((tokens) => {
        setTokens(tokens);
      });
    }
  }, [address, ethAccount]);

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3">
          <h3>{props.address}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ListGroup as="ul">
            {tokens.map((item) => {
              return <TokenItem contractAddr={address} tokenId={item} />;
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
