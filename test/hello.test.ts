import * as mocha from 'mocha';
import * as chai from 'chai';
import chai_http = require('chai-http');

import app from '../src/App';

chai.use(chai_http);
const expect = chai.expect;

describe('baseRoute', () => {

    it('should be json', () => {
        chai.request(app).get('/')
            .then(res => {
                expect(res.type).to.eql('applicaton/json');
            });
    });

    it('should have a message prop', () =>{
        chai.request(app).get('/')
            .then(res => {
                expect(res.body.message).to.eql('Hello World!');
            });
    });
    
});