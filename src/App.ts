import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as body_parser from 'body-parser';
import request = require('request');
import * as http from 'http';

class App {

    public express: express.Application;
    public server: http.Server

    constructor() {
        this.express = express();
        this.server = http.createServer(this.express);
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(body_parser.json());
        this.express.use(body_parser.urlencoded({ extended: false }));
    }

    private routes(): void {

        let router: express.Router = express.Router();

        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.json({
                message: 'Hello World!'
            });
        });

        this.express.use('/', router);
    }
}

export default new App();
