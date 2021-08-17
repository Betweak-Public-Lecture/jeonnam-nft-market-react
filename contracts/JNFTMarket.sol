pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract JNFTMarket is Ownable {
    event MarketItemCreated(
        uint256 itemId,
        uint256 tokenId,
        uint256 price,
        address nftContract,
        address seller,
        address owner
    );
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
     [연습문제2.]
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
        // 실제 NFT 토큰이 같은 JNFT Contract에 존재하기 때문에 
        // (현재 Tx를 발생시킨 account가 실제 NFT token의 주인인지는 JNFT Market에서는 확인이 불가능)
        // ==> 해당 컨트랙트에 접근해서 원소유주가 _tokenId의 주인이 맞는지 체크가 필요. 
        address nftOwner = IERC721(_nftContract).ownerOf(_tokenId); // 주소
        require(nftOwner == msg.sender);

        idToMarketItem[_itemIds] = MarketItem(_itemIds, _tokenId, _price, _nftContract, msg.sender, address(0));
        _itemIds++;
        // 만들어졌을 경우 client에게 새로운 marketItem이 Listing되었다고 알림.
        emit MarketItemCreated(_itemIds-1, _tokenId, _price, _nftContract, msg.sender, address(0));
    }




    



    /**
    [연습문제3]
    createMarketSale(address _nftContract, uint256 _itemId) 을 정의하세요.
    - 외부에서 접근이 가능해야합니다.
    - ethereum을 해당 MarketItem의 price만큼 지급받아야 합니다.
    - 실제 JNFT의 contract를 발생시켜야 합니다. (JNFT의 transferFrom 호출)
    - itemsSold 를 증가시켜야 합니다.
    - ethereum을 seller전달해야 합니다. 
     */
}