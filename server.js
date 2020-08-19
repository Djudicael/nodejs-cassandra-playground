const http = require('http');
const app = require('./src/app');

//TODO: create .env
const port = process.env.PORT || 3001;


const server = http.createServer(app);

server.listen(port, function () {
    console.log('Express server listening on port ' + port);
});