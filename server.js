const express = require('express');
const app = express();
const server = require('http').Server(app);

//------------------------------------------------------------------------------

app.use(express.static(`${__dirname}/public`));

server.listen(4444, () => {
    console.log('Listening on port 4444...');
});