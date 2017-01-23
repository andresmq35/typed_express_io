import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as body_parser from 'body-parser';
import request = require('request');
import socketio = require('socket.io');
import * as http from 'http';

class App {

    public express: express.Application;
    public server: http.Server
    public io: SocketIO.Server;

    constructor() {
        this.express = express();
        this.server = http.createServer(this.express);
        this.io = socketio(this.server);
        this.middleware();
        this.routes();
        this.sockets_listen();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(body_parser.json());
        this.express.use(body_parser.urlencoded({ extended: false }));
    }

    private routes(): void {

        let router: express.Router = express.Router();

        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // res.json({
            //     message: 'Hello World!'
            // });
            res.sendFile(__dirname + '/socket-test.html');
        });

        this.express.use('/', router);
    }
    
    private sockets_listen(): void{
        this.io.on('connection', (socket)=> {
            socket.emit('news', {"hello": "world!"});
            socket.on('sweet.data', (data)=>{
                console.log('your sweet.data: ' + JSON.stringify(data));
            });
        });
    }
}

export default new App();
