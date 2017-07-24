pragma solidity ^0.4.0;
contract badgeHash {
    mapping (address => string[]) public badgeHash;
    mapping (address => uint[]) public lengthHash;
    
    function pushHash(string _hash) public {
        if (bytes(_hash).length < 1024){
            lengthHash[msg.sender].push(bytes(_hash).length);
            badgeHash[msg.sender].push(_hash);
        }
    }
}

contract sha256Badge{
    mapping (address => byte[256][]) public badgeHash;
    
    function pushHash(byte[256] _hash) public{
        badgeHash[msg.sender].push(_hash);
    }
}