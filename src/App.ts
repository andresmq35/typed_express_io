import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as body_parser from 'body-parser';
import socketio = require('socket.io');
import * as http from 'http';

/**
 * @desc A lightweight microservice framework using typescript, express, and socketio
 */
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

    /**
     * @desc The routes for the application. We can use rest naming to create api's, or deliver static files
     *       as in the example / route. 
     */
    private routes(): void {

        let router: express.Router = express.Router();

        /**
         * @desc The base route to get the test file
         */
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.sendFile(__dirname + '/socket-test.html');
        });

        /**
         * @desc An example of a rest route to get an order by id
         */
        router.get('/order/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const reqID = req.query.id;
            res.json({
                "message": "Here is your order with id: " +  reqID
            });
        });

        this.express.use('/', router);
    }
    
    /**
     * @desc An example socket listener 
     */
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
