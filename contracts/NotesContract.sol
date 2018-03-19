pragma solidity ^0.4.17;

contract NotesContract {
    string public message;
    function NotesContract(string initialMessage) public {
        message = initialMessage;
    }
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
