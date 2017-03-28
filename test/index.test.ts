import * as chai from 'chai'
import app from '../src/index'

chai.use(require('chai-http'))

describe('baseRoute', () => {
    it('should not truncate small numbers', () => chai.request(app).get('/truncate/100000')
        .then(r => chai.expect(r.body.message).to.eql('100000'))
    )
})