pragma solidity ^0.8.28;
import "./BoxV2.sol";


contract BoxV4 is BoxV2{
    string private name;
    event NameChanged(string name);
    function setName(string memory _name) public{
        name = _name;
        emit NameChanged(name);
    }
    //if get method, memory to add view 
    function getName() public view returns(string memory){
        // 返回当前合约中存储的name值
        return string(abi.encodePacked("Name: ",name));
    }
}