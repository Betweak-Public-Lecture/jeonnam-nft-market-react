const BASE_URL = "https://ipfs.io/ipfs/";
export function ipfsToHttps(ipfsUrl) {
  return BASE_URL + ipfsUrl.substr("ipfs://".length, ipfsUrl.length);
}
