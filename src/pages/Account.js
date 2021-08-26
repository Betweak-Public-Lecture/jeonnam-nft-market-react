import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// load utils/ether
import web3, {
  jnftContract,
  marketContract,
  erc721Contract,
} from "../utils/ether";

import ContractToken from "../components/ContractToken";

export default function Account(props) {
  const [ethAccount, setEthAccount] = React.useState("");
  const [contractAddrs, setContractAddrs] = React.useState([]);
  React.useEffect(() => {
    // load account
    web3.eth.requestAccounts().then((accounts) => {
      setEthAccount(accounts[0]);
    });
  }, []);

  React.useEffect(() => {
    //   load other contract accounts
    marketContract.methods
      .fetchContractByUser()
      .call({ from: ethAccount })
      .then((contractAddrs) => {
        console.log(contractAddrs);
        setContractAddrs(contractAddrs);
      });
  }, [ethAccount]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h2>Account</h2>
        </Col>
      </Row>
      {contractAddrs.map((item) => {
        return <ContractToken address={item} />;
      })}
    </Container>
  );
}
