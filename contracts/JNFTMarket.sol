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

    // _aleradyMarketItem: 
    // key:contractAddress, value mapping(uint256(_tokenId)=>bool(true, false)) 
    mapping(address => mapping(uint256 => bool)) private _alreadyMarketItem;
    // (nftContract, tokenId)


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

    // nftContract등록을 위한 상태변수
    uint256 public contractNum;
    address[] public contractList;

    // user별로 nftContract 관리
    mapping(address => address[]) userNFTContract;

    // 1. nftContract 추가 (contractList에 추가.)
    function addNFTContract(address _nftContract){
        require(!_existNFTContract(_nftContract));
        contractList.push(_nftContract);
        contractNum++;
    }
    function _existNFTContract(address _nftContract) internal view returns(bool){
        bool result;
        for (uint256 i=0; i<contractNum; i++){
            if (contractList[i] == _nftContract){
                result = true;
            }
        }
        return result;
    }

    function addMyTokenContract(address _nftContract) public {
        require(IERC721(_nftContract).name());
        userNFTContract[msg.sender].push(_nftContract);
    }

    function fetchContractByUser() public view returns(address[] memory) {
        return userNFTContract[msg.sender];
    }

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

     - 판매자가 호출
     */
    function createMarketItem(address _nftContract, uint256 _tokenId, uint256 _price) public payable {
        // 1. ethereum의 양이 listingPrice만큼 존재하는지
        require(msg.value == listingPrice);

        // 2. _nftContract와 _tokenId가 현재 팔리고 있지 않은지 확인하여라.
        require(!_alreadyMarketItem[_nftContract][_tokenId]);

        require(_price > 0);

        // 실제 NFT 토큰이 같은 JNFT Contract에 존재하기 때문에 
        // (현재 Tx를 발생시킨 account가 실제 NFT token의 주인인지는 JNFT Market에서는 확인이 불가능)
        // ==> 해당 컨트랙트에 접근해서 원소유주가 _tokenId의 주인이 맞는지 체크가 필요. 
        address nftOwner = IERC721(_nftContract).ownerOf(_tokenId); // 주소
        require(nftOwner == msg.sender);

        

        // 2-1. 팔고 있는 중이라고 명시
        _alreadyMarketItem[_nftContract][_tokenId] = true;
        
        idToMarketItem[_itemIds] = MarketItem(_itemIds, _tokenId, _price, _nftContract, msg.sender, address(0));
        _itemIds++;
        // 만들어졌을 경우 client에게 새로운 marketItem이 Listing되었다고 알림.
        emit MarketItemCreated(_itemIds-1, _tokenId, _price, _nftContract, msg.sender, address(0));
    }

    /**
       [연습문제]
     */
    function cancelMarketCreated(uint256 _itemId) public {
        // 1. require로 현재 상품이 팔리는 중인지 체크
        MarketItem storage item = idToMarketItem[_itemId];
        require(item.owner == address(0));
        // 2. Tx을 발생시킨 account가 실제 해당 token의 소유주가 맞는지
        // 2-1.
        // address nftOwner = IERC721(item.nftContract).ownerOf(item.tokenId);
        // require(nftOwner == msg.sender);
        // 2-2.
        require(msg.sender == item.seller);

        // 3. 취소 logic 작성
        // 3-1. _alreadyMarketItem false로 만들기
        _alreadyMarketItem[item.nftContract][item.tokenId] = false;
        // 3-2. idToMarketItem[_itemId]의 owner값 입력하기(원래 seller)
        item.owner = msg.sender;
        // 3-3. _itemSoldCount++;
        _itemSoldCount++;
    }

    /**
    [연습문제3 - 구입 contract 정의하기]
    createMarketSale(uint256 _itemId) 을 정의하세요.: 
    - 외부에서 접근이 가능해야합니다.
    - ethereum을 해당 MarketItem의 price만큼 지급받아야 합니다.
    - 아직 거래가 체결되지 않았어야 합니다.

    - 실제 JNFT의 contract를 발생시켜야 합니다. (JNFT의 transferFrom 호출)
    - itemsSoldCount 를 증가시켜야 합니다.
    - ethereum을 seller전달해야 합니다.

    - 구매자가 호출 
     */
    function createMarketSale(uint256 _itemId) public payable{
        MarketItem storage item = idToMarketItem[_itemId];
        require(msg.value == item.price); // 판매금액만큼 지불 받았는지
        require(item.owner == address(0)); // 아직 거래되지 않았는지

        //- 실제 JNFT의 contract를 발생시켜야 합니다. (JNFT의 transferFrom 호출)
        IERC721(item.nftContract).transferFrom(item.seller, msg.sender, item.tokenId);

        _alreadyMarketItem[item.nftContract][item.tokenId] = false;

        item.owner = msg.sender;
        _itemSoldCount++;
        // seller에게 이더리움 전송하기
        payable(item.seller).transfer(item.price);
    }

     /**
     [연습문제4 - 팔리지 않은 모든 marketItem가져오기]
     fetchUnsoldMarketItems() 정의.
     - 외부에서 접근 가능해야합니다.
     - 조회만 하는 함수이므로 가스 최적화를 위해 OO로 정의 하셔야 합니다.
     - return 값은 MarketItem 배열이어야 합니다.
     - 팔리지 않은 모든 item들을 return 해야 합니다.
     */
    function fetchUnsoldMarketItems() external view returns(MarketItem[] memory){
        uint256 itemCount = _itemIds; // 전체 listing된 marketItemCount
        uint256 unSoldItemCount = itemCount - _itemSoldCount;

        // 팔리지 않은 모든 marketItem을 return
        MarketItem[] memory unSoldMarketItems = new MarketItem[](unSoldItemCount);

        // 전체 배열을 순회하면서 해당되는 MarketItem 찾아서 배정
        uint256 count = 0;
        for (uint256 i=0; i<itemCount; i++){
            if(idToMarketItem[i].owner == address(0)){
                unSoldMarketItems[count] = idToMarketItem[i];
                count++;
            }
        }
        return unSoldMarketItems;
    }


























     /**
     [연습문제5 - fetchmarketItem가져오기]
     fetchMarketItem(uint256 _itemId) 정의.
     - 외부에서 접근 가능해야합니다.
     - 조회만 하는 함수이므로 가스 최적화를 위해 OO로 정의 하셔야 합니다.
     - return 값은 MarketItem이어야 합니다.
     - _itemId에 해당하는 marketItem을 return 해야 합니다.
      */
}