import * as http from 'http';
import * as debug from 'debug';
import * as express from 'express';

import App from './App';
debug('ts-express:server');

class TypedServer{

    private app: express.Application;
    private server: http.Server;
    private port: number | string | boolean;

    constructor(){
        this.app = App.express;
        const norm_port = this.init_port(this.app);
        this.port = norm_port;
        const app_server = this.init_server(norm_port);
        this.server = app_server;
    }

    /**
     * @desc Initialize the port for the service to use the environment variable PORT.
     *       If it does not exist, use port 3000
     * @param app The express application
     */
    private init_port(app: express.Application): number | string | boolean{
        const norm_port = this.normalizePort(process.env.PORT || 3000);
        app.set('port', norm_port);
        return norm_port;
    }

    /**
     * @desc Intialize an express server. Setup port listeners and error listeners
     * @param port The port to run the express application on
     */
    private init_server(port: number | string | boolean): http.Server{
        const app_server: http.Server = App.server;
        app_server.listen(port);
        app_server.on('error', this.on_error);
        return app_server;
    }

    /**
     * @desc A helper method to convert a string port to a numeric, integer port.
     *       If the port is false, then likely there is no env set and it will default to 3000
     * @param val The value of the port to normalize
     */
    private normalizePort(val: number | string): number | string | boolean {
        let norm_port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(norm_port)) {
            return val;
        } else if (norm_port >= 0) {
            return norm_port;
        } else {
            return false;
        }
    }

    /**
     * @desc The error listener for the application. Will exit out of the application on unhandled error.
     *       Probably should refactor to handle errors without exiting the process
     * @param error The node js error to report
     */
    private on_error(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        let bind: string = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated priveleges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

new TypedServer();
