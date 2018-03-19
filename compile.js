const path = require('path');
const fs = require('fs');
const solc = require('solc');

const notesPath = path.resolve(__dirname, 'contracts','NotesContract.sol');
const source = fs.readFileSync(notesPath, 'utf8');
module.exports = solc.compile(source,1).contracts[':NotesContract'];
