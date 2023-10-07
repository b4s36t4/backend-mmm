import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Lock', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contact = await ethers.getContractFactory('Contacts');
    const contact = await Contact.deploy();

    return { contact, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should deploy the contact', async function () {
      const { contact } = await loadFixture(deployOneYearLockFixture);

      expect(contact.address.length).not.eq(0);
    });

    it('Should add contact correctly', async function () {
      const { contact, owner } = await loadFixture(deployOneYearLockFixture);

      await expect(
        contact.insertContact(
          'maheshvagicherla99438@gmail.com',
          'google.com',
          'Mahesh Vagicherla',
        ),
      )
        .to.emit(contact, 'ContactAdd')
        .withArgs(
          owner.address,
          'Mahesh Vagicherla',
          'maheshvagicherla99438@gmail.com',
        );

      const _contact = await contact.getContact(owner.address);

      expect(_contact.email).eq('maheshvagicherla99438@gmail.com');
    });
  });
});
