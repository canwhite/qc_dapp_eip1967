// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
// 注意add @openzeppelin/contracts-upgradeable
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Box is Initializable {
    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // 然后用initialize作为初始化函数
    function initialize(uint256 newValue) public initializer {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // 存储新值
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // 读取存储的值
    function retrieve() public view returns (uint256) {
        return value;
    }
}