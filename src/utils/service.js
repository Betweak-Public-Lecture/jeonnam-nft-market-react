import { erc721Contract } from "./ether";

export async function getTokensByEvent(contractAddr, userAddr) {
  erc721Contract.options.address = contractAddr;
  const events = await erc721Contract.getPastEvents("Transfer");
  console.log(events);
}
