const logEntriesConsole = require('../index');

console.log('Before');
logEntriesConsole.register({ token: process.argv[2], print:true });
console.log('After');
process.exit(0);
