const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile.js');

let accounts;
let notesContract;
const INITIAL_STRING = 'Welcome to the show!';

beforeEach(async() => {
  accounts = await web3.eth.getAccounts();
  notesContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_STRING]})
    .send({from: accounts[0], gas: '1000000'});
  notesContract.setProvider(provider);
});

describe('NotesContract', () => {
  it('should deploy a contract', () => {
    assert.ok(notesContract.options.address);
  });
  it('should have a default message', async () => {
      const message = await notesContract.methods.message().call();
      assert.equal(message, INITIAL_STRING);
  });
  it('should change the message', async () => {
    await notesContract.methods.setMessage('Enjoy your day!').send({from: accounts[0]});
    const message = await notesContract.methods.message().call();
    assert.equal(message, 'Enjoy your day!');
  });
});
