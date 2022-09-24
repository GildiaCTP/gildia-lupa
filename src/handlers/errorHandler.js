const client = require("../client.js");

client.on('error', async (err) => {
    console.log(`[ ⚠️ ] Error: `, err);
});

client.on('warn', async (warn) => {
    console.log(`[ ⚠️ ] Warning: `, warn);
});