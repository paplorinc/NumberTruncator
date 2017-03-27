import * as chai from 'chai';
import app from '../src/App';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe('baseRoute', () => {
    it('should be json', () => chai.request(app).get('/')
        .then(r => chai.expect(r.type).to.eql('application/json'))
    )

    it('should have a message prop', () => chai.request(app).get('/')
        .then(r => chai.expect(r.body.message).to.eql('Hello World!'))
    )
});