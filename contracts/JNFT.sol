// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// https://eips.ethereum.org/EIPS/eip-721

/**
  ethereum 
  <address>.transfer(1eth)
  payable(<address>).transfer
 */


contract JNFT is ERC721URIStorage {
  address private _marketAddress;
  uint256 private _tokenId;

  // struct NFTItem{
  //   address prevOwner,
  //   uint16 txCount
  // }

  constructor(address _marketStoreAddress) ERC721("JeonNam NFT", "JNFT"){
    _marketAddress = _marketStoreAddress;
  }

  /**
    1. token ID 만들기
    2. mint
    3. setTokenURI(itemId, tokenURI) 연결
    4. setApproveForAll(_marketAddress)
    @return {tokenId}
   */
  function createToken(string memory _tokenURI) public returns (uint256){
    _mint(msg.sender, _tokenId); // 기록: <ERC721> Contract
    _setTokenURI(_tokenId, _tokenURI); // 기록: <ERC721URIStorage> Contract

    setApprovalForAll(_marketAddress, true);

    _tokenId++;
    return (_tokenId - 1);
  }

  /**
   * address값으로 tokenId 배열을 return
   * @return {tokenId[]}
   */
  function fetchTokensByAddress(address _owner) external view returns (uint256[] memory){
    uint256 balance = balanceOf(_owner);
    uint256[] memory result = new uint256[](balance);

    uint256 count = 0;
    for (uint256 i=0; i<_tokenId; i++){
      address tokenOwner = ownerOf(i);
      if (tokenOwner == _owner){
        result[count] = i;
        count++;
      }
    }

    return result;
  }



}
