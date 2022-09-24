const client = require('../../client.js');
const db = require('quick.db');
const config = require('../../config.js');

client.on('ready', async () => {
    console.log(`[ 🔌 ] Pomyślnie połączono się z botem i zalogowano jako ${client.user.tag}!`);
});