// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Transactions {
    uint256 transactionsCount;

    event Transaction(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransfarStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransfarStruct[] transactions;

    function addToBlockchain(
        address payable _receiver,
        uint _amount,
        string memory _message,
        string memory _keyword
    ) public {
        transactionsCount = transactionsCount + 1;
        transactions.push(
            TransfarStruct(
                msg.sender,
                _receiver,
                _amount,
                _message,
                block.timestamp,
                _keyword
            )
        );
        emit Transaction(
            msg.sender,
            _receiver,
            _amount,
            _message,
            block.timestamp,
            _keyword
        );
    }
    function getAllTransactions()
        public
        view
        returns (TransfarStruct[] memory)
    {
        return transactions;
    }
    function getTransactionCount() public view returns (uint256) {
        return transactionsCount;
    }
}
