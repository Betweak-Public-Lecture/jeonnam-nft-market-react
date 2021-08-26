import React from "react";

import { ListGroupItem } from "react-bootstrap";
import { jnftContract } from "../utils/ether";

export default function TokenItem({ tokenId, contractAddr }) {
  const [tokenURI, setTokenURI] = React.useState("");
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
  return (
    <ListGroupItem>
      <div>
        {tokenId} - {tokenURI}
      </div>
    </ListGroupItem>
  );
}
