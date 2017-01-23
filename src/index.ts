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

    private init_port(app: express.Application): number | string | boolean{
        const norm_port = this.normalizePort(process.env.PORT || 3000);
        app.set('port', norm_port);
        return norm_port;
    }

    private init_server(port: number | string | boolean): http.Server{
        const app_server: http.Server = App.server;
        app_server.listen(port);
        app_server.on('error', this.on_error);
        return app_server;
    }

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
