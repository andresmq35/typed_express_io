import * as mocha from 'mocha';
import * as chai from 'chai';
import chai_http = require('chai-http');

import app from '../src/App';

chai.use(chai_http);
const expect = chai.expect;

describe('baseRoute', () => {

    it('should be the test html file', () => {
        chai.request(app.server).get('/')
            .then(res => {
                expect(res.type).to.eql('text/html');
            });
    });

    it('should have a message that says Hello World!', () =>{
        chai.request(app.server).get('/')
            .then(res => {
                expect(res.body.message).to.eql('Hello World!');
            });
    });
    
});