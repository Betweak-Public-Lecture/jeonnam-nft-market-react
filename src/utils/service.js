import { erc721Contract } from "./ether";

export async function getTokensByEvent(contractAddr, userAddr) {
  erc721Contract.options.address = contractAddr;
  const events = await erc721Contract.getPastEvents("Transfer", {
    fromBlock: "earliest",
    toBlock: "latest",
  });
  let result = [];

  for (let item of events) {
    if (item.returnValues.to === userAddr) {
      result.push(item.returnValues.tokenId);
    }
    if (item.returnValues.from === userAddr) {
      result = result.filter((v) => {
        if (v === item.returnValues.tokenId) {
          return false;
        }
        return true;
      });
    }
  }

  return result;
}
