pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract JNFTMarket is Ownable {
    constructor(){}
    uint256 private _itemIds; // item의 counting역할
    uint256 private _itemSoldCount; // 팔린 item의 개수
    uint256 listingPrice = 0.001 ether;

    struct MarketItem{
        uint256 itemId;         // JNFTMarket에서 관리할 id
        uint256 tokenId;        // NFT Contract에서 관리할 id
        uint256 price;          // 얼마에 팔지.
        address nftContract;    // NFT Contract address
        address seller;         // 파는 사람의 account address
        address owner;          // 거래가 체결되었을 때, 이전될 NFT의 주인.
    }

    // key: itemId, value: MarketItem mapping생성
    mapping(uint256 => MarketItem) private idToMarketItem;

    /**
     [연습문제1.]
     setListingPrice를 정의하세요. 
     - 외부에서 접근이 가능하도록 정의하고, 
       내용은 listingPrice를 변경할 수 있어야 합니다.
     */
    function setListingPrice(uint256 _listingPrice) public onlyOwner {
        listingPrice = _listingPrice;
    }


    function withdraw(uint256 _amount) public onlyOwner {
        // address owner = owner();
        // owner.transfer(_amount);
        address payable owner = payable(owner());
        owner.transfer(_amount);
    }
    
    /**
     [연순분제2.]
     createMarketItem(address _nftContract, uint256 _tokenId, uint256 _price)
     - 외부에서 접근이 가능해야합니다.
     - ethereum을 listingPrice만큼 지급받아야 합니다.
     - _price는 0보단 커야합니다. (판매금액)
     - _itemIds를 1씩 증가시키면서 idToMarketItem의 id로써 사용되어야 합니다.
     */
    function createMarketItem(address _nftContract, uint256 _tokenId, uint256 _price) public payable {
        // 1. ethereum의 양이 listingPrice만큼 존재하는지
        require(msg.value == listingPrice);
        require(_price > 0);
        idToMarketItem[_itemIds] = MarketItem(_itemIds, _tokenId, _price, _nftContract, msg.sender, address(0));
        _itemIds++;
    }
}