pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract JNFTMarket is Ownable {
    constructor(){}

    function withdraw(uint _amount) public onlyOwner {
        // address owner = owner();
        // owner.transfer(_amount);
        address payable owner = payable(owner());
        owner.transfer(_amount);
    }
}