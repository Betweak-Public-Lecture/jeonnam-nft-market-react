import Web3 from "web3";
import jnftArtifact from "../artifacts/JNFT.json";
import marketArtifact from "../artifacts/JNFTMarket.json";
import erc721Artifact from "../artifacts/IERC721.json";

export const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:9548");
export const jnftContract = new web3.eth.Contract(
  jnftArtifact.abi,
  jnftArtifact.networks["5777"].address
);
export const marketContract = new web3.eth.Contract(
  marketArtifact.abi,
  marketArtifact.networks["5777"].address
);

export const erc721Contract = new web3.eth.Contract(erc721Artifact.abi);

export default web3;
