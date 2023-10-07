// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Contacts {
    mapping(address => Contact) public contacts;

    struct Contact {
        string email;
        string website;
        string name;
    }

    function getContact(address addr) public view returns (Contact memory) {
        return contacts[addr];
    }

    event ContactAdd(address indexed addr, string name, string email);

    function insertContact(
        string calldata email,
        string calldata website,
        string calldata name
    ) public {
        Contact memory contact = Contact(email, website, name);
        contacts[msg.sender] = contact;
        emit ContactAdd(msg.sender, name, email);
    }
}
