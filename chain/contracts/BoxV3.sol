pragma solidity ^0.8.28;
import "./BoxV2.sol";

contract BoxV3 is BoxV2{
    //add state variable of name
    //PS: we only can add new state, but can not change the old state
    string public name;
    event NameChanged(string name);

    function setName(string memory _name) public{
        name = _name;
        emit  NameChanged(name);
    }

}