import * as mocha from 'mocha';
import * as chai from 'chai';
import io = require('socket.io-client');

const socketURL = 'http://localhost:3000';

const options = {
  "transports": ['websocket'],
  "force new connection": true,
  "path": "/socket"
};

describe("socket connection", function (){
    it('should test emitting a socket connection', function(done){
            const client = io.connect(socketURL, options);
            client.on('connect', function(data){
                client.emit('sweet.data', {
                    "tight data": 'bangin data'
                });
                done();
            });
    });
});