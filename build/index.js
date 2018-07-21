"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const dotenv = require("dotenv");
const app_1 = require("./app");
const debug = require("debug")("express:server");
dotenv.config({ path: '.env' });
const httpPort = process.env.PORT || 8080;
const server = app_1.default.bootstrap().express;
server.set('port', httpPort);
var httpServer = http.createServer(server);
//listen on provided ports
httpServer.listen(httpPort);
//add error handler
httpServer.on('error', onError);
//start listening on port
httpServer.on('listening', onListening);
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof httpPort === 'string' ? 'Pipe ' + httpPort : 'Port ' + httpPort;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = httpServer.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
//# sourceMappingURL=index.js.map