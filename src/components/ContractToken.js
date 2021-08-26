import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import web3, { erc721Contract } from "../utils/ether";

export default function ContractToken(props) {
  // 호출된 모든 Transfer Event를 가져옴.
  // 기록된 Event를 확인하면서
  const { address } = props;
  const [ethAccount, setEthAccount] = React.useState("");
  React.useEffect(() => {
    web3.eth.requestAccounts().then((accounts) => {
      setEthAccount(accounts[0]);
    });
  }, []);

  React.useEffect(() => {
    if (address) {
      erc721Contract.options.address = address;
      // Contract.getPastEvent ==> 지난 event 모두 가져옴.
      erc721Contract
        .getPastEvents("Transfer", {
          filter: {
            to: ethAccount,
          },
          fromBlock: 0,
          toBlock: "latest",
        })
        .then((events) => {
          console.log(events);
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
          <ul>
            <li>..</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
