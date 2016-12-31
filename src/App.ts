import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as body_parser from 'body-parser';
import request = require('request');

// Creates and configures an ExpressJS web servrer
class App{
    public express: express.Application;

    constructor(){
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware
    private middleware():void {
        this.express.use(logger('dev'));
        this.express.use(body_parser.json());
        this.express.use(body_parser.urlencoded({extended: false}));        
    }
    // Configure API endpoints
    private routes(): void{
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        let router: express.Router = express.Router();
        //placeholder route handler
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    }
}

export default new App().express;